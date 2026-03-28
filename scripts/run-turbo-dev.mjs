import { spawn } from 'node:child_process';
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

function terminateChild(signal) {
	if (child.killed) {
		return;
	}

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
