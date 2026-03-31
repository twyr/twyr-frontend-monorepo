import { proxyCorePlatformRequest } from '../../../../_lib/core-platform';

const PATH = '/api/v1/users/session-manager/logout';

export async function GET(request: Request) {
	return proxyCorePlatformRequest(request, {
		path: PATH,
		method: 'POST'
	});
}

export async function POST(request: Request) {
	return proxyCorePlatformRequest(request, {
		path: PATH,
		method: 'POST'
	});
}
