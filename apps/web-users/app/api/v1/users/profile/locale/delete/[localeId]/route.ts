import { proxyCorePlatformRequest } from '../../../../../../_lib/core-platform';

export async function DELETE(
	request: Request,
	{ params }: { params: Promise<{ localeId: string }> }
) {
	const { localeId } = await params;

	return proxyCorePlatformRequest(request, {
		path: `/api/v1/users/profile/locale/delete/${localeId}`,
		method: 'DELETE'
	});
}
