import { NextResponse } from 'next/server';
import { proxyCorePlatformRequest } from '../../../../_lib/core-platform';

const PATH = '/api/v1/system-admin/session-manager/login';

export async function POST(request: Request) {
	const body = (await request.json().catch(() => null)) as {
		username?: unknown;
		password?: unknown;
	} | null;
	const username =
		typeof body?.username === 'string' ? body.username.trim() : '';
	const password =
		typeof body?.password === 'string' ? body.password.trim() : '';

	if (!username || !password) {
		return NextResponse.json(
			{ error: 'username and password are required' },
			{ status: 400 }
		);
	}

	return proxyCorePlatformRequest(request, {
		path: PATH,
		method: 'POST',
		bodyText: JSON.stringify({ username, password })
	});
}
