import { proxyCorePlatformRequest } from '../../../../_lib/core-platform';

const PATH = '/api/v1/users/profile/create';

export async function POST(request: Request) {
	return proxyCorePlatformRequest(request, {
		path: PATH,
		method: 'POST',
		bodyText: await request.text(),
		includeNameLocale: true
	});
}
