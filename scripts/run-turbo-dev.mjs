/* eslint-disable n/no-process-exit */

import { spawn } from 'node:child_process';
import { execFileSync } from 'node:child_process';
import { join } from 'node:path';

const shutdownSignals = ['SIGINT', 'SIGTERM', 'SIGHUP', 'SIGQUIT'];

const turboBinary = join(
	process.cwd(),
	'node_modules',
	'.bin',
	process.platform === 'win32' ? 'turbo.cmd' : 'turbo'
);

const turboArgs = process.argv.slice(2);

const child = spawn(turboBinary, turboArgs, {
	stdio: ['inherit', 'inherit', 'pipe'],
	env: process.env,
	detached: process.platform !== 'win32'
});

let shutdownRequested = false;
let shutdownSignal = null;
let shutdownDrainPromise = null;
const shutdownTargetPids = new Set();
let stderrBuffer = '';

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

function captureShutdownTargets() {
	if (!child.pid) {
		return;
	}

	for (const descendantPid of getDescendantPids(child.pid)) {
		shutdownTargetPids.add(descendantPid);
	}
}

function terminateCapturedTargets(signal) {
	for (const targetPid of [...shutdownTargetPids].reverse()) {
		signalPid(targetPid, signal);
	}
}

function getLiveShutdownTargets() {
	const liveTargetPids = [];

	for (const targetPid of shutdownTargetPids) {
		try {
			process.kill(targetPid, 0);
			liveTargetPids.push(targetPid);
		} catch (error) {
			if (error && error.code === 'ESRCH') {
				shutdownTargetPids.delete(targetPid);
				continue;
			}

			liveTargetPids.push(targetPid);
		}
	}

	return liveTargetPids;
}

function wait(delayMs) {
	return new Promise((resolve) => {
		setTimeout(resolve, delayMs);
	});
}

async function drainShutdownTargets() {
	if (shutdownDrainPromise) {
		return shutdownDrainPromise;
	}

	shutdownDrainPromise = (async () => {
		if (process.platform === 'win32') {
			return;
		}

		for (let attempt = 0; attempt < 10; attempt += 1) {
			if (getLiveShutdownTargets().length === 0) {
				return;
			}

			if (attempt === 2) {
				terminateCapturedTargets('SIGTERM');
			}

			if (attempt === 6) {
				terminateCapturedTargets('SIGKILL');
			}

			await wait(200);
		}
	})();

	return shutdownDrainPromise;
}

function shouldSuppressStderrLine(line) {
	return shutdownRequested && /run failed: command\s+exited \(1\)/.test(line);
}

function flushStderrBuffer(force = false) {
	const lines = stderrBuffer.split('\n');

	if (!force) {
		stderrBuffer = lines.pop() ?? '';
	} else {
		stderrBuffer = '';
	}

	for (const line of lines) {
		const output = `${line}\n`;

		if (shouldSuppressStderrLine(output)) {
			continue;
		}

		process.stderr.write(output);
	}

	if (force && stderrBuffer) {
		if (!shouldSuppressStderrLine(stderrBuffer)) {
			process.stderr.write(stderrBuffer);
		}

		stderrBuffer = '';
	}
}

function terminateChild(signal) {
	if (child.killed) {
		return;
	}

	captureShutdownTargets();

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
		shutdownSignal = signal;
		terminateChild(signal);
	});
}

child.on('error', (error) => {
	console.error(error);
	process.exit(1);
});

child.stderr?.setEncoding('utf8');
child.stderr?.on('data', (chunk) => {
	stderrBuffer += chunk;
	flushStderrBuffer();
});
child.stderr?.on('close', () => {
	flushStderrBuffer(true);
});

child.on('exit', async (code, signal) => {
	if (shutdownRequested) {
		await drainShutdownTargets();
		process.exit(0);
	}

	if (
		shutdownSignals.includes(signal) ||
		code === 130 ||
		code === 143 ||
		(shutdownSignal === 'SIGINT' && signal === 'SIGINT')
	) {
		process.exit(0);
	}

	process.exit(code ?? 1);
});
