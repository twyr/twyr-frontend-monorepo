import { NextResponse } from 'next/server';
import { proxyCorePlatformRequest } from '../../../../_lib/core-platform';

const PATH = '/api/v1/users/session-manager/generate-otp';

export async function POST(request: Request) {
	const body = (await request.json().catch(() => null)) as {
		username?: unknown;
	} | null;
	const username =
		typeof body?.username === 'string' ? body.username.trim() : '';

	if (!username) {
		return NextResponse.json(
			{ error: 'username is required' },
			{ status: 400 }
		);
	}

	return proxyCorePlatformRequest(request, {
		path: PATH,
		method: 'POST',
		bodyText: JSON.stringify({ username })
	});
}
