import { proxyCorePlatformRequest } from '../../../../../_lib/core-platform';

export async function POST(request: Request) {
	return proxyCorePlatformRequest(request, {
		path: '/api/v1/system-admin/profile/locale/create',
		method: 'POST',
		bodyText: await request.text()
	});
}
