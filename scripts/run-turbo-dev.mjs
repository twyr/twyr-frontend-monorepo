import { spawn } from 'node:child_process';
import { execFileSync } from 'node:child_process';
import { join } from 'node:path';

const shutdownSignals = ['SIGINT', 'SIGTERM', 'SIGHUP', 'SIGQUIT'];

function getForwardedSignal(signal) {
	if (signal === 'SIGINT' || signal === 'SIGHUP' || signal === 'SIGQUIT') {
		return 'SIGTERM';
	}

	return signal;
}

const turboBinary = join(
	process.cwd(),
	'node_modules',
	'.bin',
	process.platform === 'win32' ? 'turbo.cmd' : 'turbo'
);

const turboArgs = process.argv.slice(2);

const child = spawn(turboBinary, turboArgs, {
	stdio: 'inherit',
	env: process.env,
	detached: process.platform !== 'win32'
});

let shutdownRequested = false;

function getProcessSnapshot() {
	try {
		return execFileSync('ps', ['-eo', 'pid=,ppid='], {
			encoding: 'utf8',
			stdio: ['ignore', 'pipe', 'ignore']
		});
	} catch {
		return '';
	}
}

function getDescendantPids(rootPid) {
	if (!rootPid) {
		return [];
	}

	const processSnapshot = getProcessSnapshot();

	if (!processSnapshot) {
		return [];
	}

	const parentToChildren = new Map();

	for (const line of processSnapshot.split('\n')) {
		const [pidValue, ppidValue] = line
			.trim()
			.split(/\s+/)
			.map((value) => Number.parseInt(value, 10));

		if (!Number.isInteger(pidValue) || !Number.isInteger(ppidValue)) {
			continue;
		}

		const childPids = parentToChildren.get(ppidValue) ?? [];
		childPids.push(pidValue);
		parentToChildren.set(ppidValue, childPids);
	}

	const descendantPids = [];
	const pendingParentPids = [...(parentToChildren.get(rootPid) ?? [])];

	while (pendingParentPids.length > 0) {
		const childPid = pendingParentPids.pop();

		if (!childPid) {
			continue;
		}

		descendantPids.push(childPid);
		pendingParentPids.push(...(parentToChildren.get(childPid) ?? []));
	}

	return descendantPids;
}

function signalPid(pid, signal) {
	try {
		process.kill(pid, signal);
	} catch (error) {
		if (error && error.code !== 'ESRCH') {
			console.error(error);
		}
	}
}

function terminateDescendants(signal) {
	if (process.platform === 'win32' || !child.pid) {
		return;
	}

	const descendantPids = getDescendantPids(child.pid);

	for (const descendantPid of descendantPids.reverse()) {
		signalPid(descendantPid, signal);
	}
}

function terminateChild(signal) {
	if (child.killed) {
		return;
	}

	terminateDescendants(signal);

	if (process.platform !== 'win32' && child.pid) {
		try {
			process.kill(-child.pid, signal);
			return;
		} catch (error) {
			if (error && error.code !== 'ESRCH') {
				console.error(error);
			}
		}
	}

	child.kill(signal);
}

for (const signal of shutdownSignals) {
	process.on(signal, () => {
		if (shutdownRequested || child.killed) {
			return;
		}

		shutdownRequested = true;
		terminateChild(getForwardedSignal(signal));
	});
}

child.on('error', (error) => {
	console.error(error);
	process.exit(1);
});

child.on('exit', (code, signal) => {
	if (shutdownRequested) {
		terminateDescendants('SIGKILL');
	}

	if (
		(shutdownRequested && signal === 'SIGKILL') ||
		shutdownSignals.includes(signal) ||
		code === 130 ||
		code === 143
	) {
		process.exit(0);
	}

	process.exit(code ?? 1);
});
