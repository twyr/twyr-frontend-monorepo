import { proxyCorePlatformRequest } from '../../../../../_lib/core-platform';

export async function PATCH(request: Request) {
	return proxyCorePlatformRequest(request, {
		path: '/api/v1/system-admin/profile/contact/update',
		method: 'PATCH',
		bodyText: await request.text()
	});
}
