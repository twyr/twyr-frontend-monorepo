import { proxyCorePlatformRequest } from '../../../../../_lib/core-platform';

export async function POST(request: Request) {
	return proxyCorePlatformRequest(request, {
		path: '/api/v1/users/profile/locale/create',
		method: 'POST',
		bodyText: await request.text()
	});
}
