import { proxyCorePlatformRequest } from '../../../../_lib/core-platform';

const PATH = '/api/v1/system-admin/profile/update';

export async function PATCH(request: Request) {
	return proxyCorePlatformRequest(request, {
		path: PATH,
		method: 'PATCH',
		bodyText: await request.text(),
		includeNameLocale: true
	});
}
