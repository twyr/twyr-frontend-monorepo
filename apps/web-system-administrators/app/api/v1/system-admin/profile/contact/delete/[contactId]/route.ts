import { proxyCorePlatformRequest } from '../../../../../../_lib/core-platform';

export async function DELETE(
	request: Request,
	{ params }: { params: Promise<{ contactId: string }> }
) {
	const { contactId } = await params;

	return proxyCorePlatformRequest(request, {
		path: `/api/v1/system-admin/profile/contact/delete/${contactId}`,
		method: 'DELETE'
	});
}
