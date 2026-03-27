import { ApiClient } from '@twyr/core';

const baseUrl = process.env.TWYR_CORE_API_BASE_URL ?? 'http://localhost:9090';

export const coreApi = new ApiClient({
	baseUrl,
	defaultHeaders: {
		'x-twyr-bff': 'users/profile'
	}
});
