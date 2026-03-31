import { proxyCorePlatformRequest } from '../../../_lib/core-platform';

const PATH = '/api/v1/system-admin/profile';

export async function GET(request: Request) {
	return proxyCorePlatformRequest(request, {
		path: PATH,
		method: 'GET'
	});
}
