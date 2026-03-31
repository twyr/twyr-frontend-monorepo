import type { LoginRequestDto } from '@twyr/system-administrators-session-management-shared';
import type { ApiRequestContext } from '@twyr/core';
import { loginRequestSchema } from '@twyr/system-administrators-session-management-shared';
import { login } from '../services/aggregator';

export async function loginRoute(
	body: LoginRequestDto,
	context?: ApiRequestContext
) {
	const request = loginRequestSchema.parse(body);
	return login(request, context);
}
