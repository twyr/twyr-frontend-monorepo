import { ApiClient, resolveAuthServerBaseUrl } from '@twyr/core';

export const coreApi = new ApiClient({
	baseUrl: resolveAuthServerBaseUrl(),
	defaultHeaders: {
		'x-twyr-bff': 'system_administrators/session_management'
	}
});
