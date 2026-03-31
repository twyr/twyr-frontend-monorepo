import { buildAuthServerUrl } from '@twyr/core';

const VALIDATE_SESSION_PATH =
	'/api/v1/system-admin/session-manager/validate-session';

export async function isSystemAdministratorsSessionValid(
	cookieHeader?: string | null
) {
	if (!cookieHeader) {
		return false;
	}

	try {
		const response = await fetch(
			buildAuthServerUrl(VALIDATE_SESSION_PATH, { cookieHeader }),
			{
				method: 'GET',
				headers: {
					Cookie: cookieHeader
				},
				cache: 'no-store'
			}
		);

		if (response.status === 200) {
			return true;
		}

		if (response.status === 400) {
			return false;
		}

		console.error(
			`Unexpected system administrators session validation status from auth server: ${response.status}`
		);
		return false;
	} catch (error) {
		console.error(
			'Failed to validate system administrators session with auth server.',
			error
		);
		return false;
	}
}
