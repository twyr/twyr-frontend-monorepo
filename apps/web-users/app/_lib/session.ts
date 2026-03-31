import { buildAuthServerUrl } from '@twyr/core';

const VALIDATE_SESSION_PATH = '/api/v1/users/session-manager/validate-session';

export async function isUsersSessionValid(cookieHeader?: string | null) {
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
			`Unexpected users session validation status from auth server: ${response.status}`
		);
		return false;
	} catch (error) {
		console.error(
			'Failed to validate users session with auth server.',
			error
		);
		return false;
	}
}
