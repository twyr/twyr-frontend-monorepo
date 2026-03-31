import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';
import { UsersPortal } from './UsersPortal';
import { isUsersSessionValid } from './_lib/session';

export default async function UsersHomePage() {
	const cookieStore = await cookies();
	const cookieHeader = cookieStore
		.getAll()
		.map((cookie) => `${cookie.name}=${cookie.value}`)
		.join('; ');

	if (!(await isUsersSessionValid(cookieHeader))) {
		redirect('/session-management');
	}

	return <UsersPortal view="dashboard" serverAuthenticated />;
}
