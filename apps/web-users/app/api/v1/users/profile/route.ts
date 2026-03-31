import { proxyCorePlatformRequest } from '../../../_lib/core-platform';

const PATH = '/api/v1/users/profile';

export async function GET(request: Request) {
	return proxyCorePlatformRequest(request, {
		path: PATH,
		method: 'GET'
	});
}
