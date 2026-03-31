import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';
import { SystemAdministratorsPortal } from '../SystemAdministratorsPortal';
import { isSystemAdministratorsSessionValid } from '../_lib/session';

export default async function SystemAdministratorsProfilePage() {
	const cookieStore = await cookies();
	const cookieHeader = cookieStore
		.getAll()
		.map((cookie) => `${cookie.name}=${cookie.value}`)
		.join('; ');

	if (!(await isSystemAdministratorsSessionValid(cookieHeader))) {
		redirect('/session-management');
	}

	return <SystemAdministratorsPortal view="profile" serverAuthenticated />;
}
