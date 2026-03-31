import type {
	LoginRequestDto,
	SessionDto
} from '@twyr/users-session-management-shared';
import type { ApiRequestContext } from '@twyr/core';
import { coreApi } from './core-api';

export async function login(
	request: LoginRequestDto,
	context?: ApiRequestContext
): Promise<SessionDto> {
	return coreApi.post<SessionDto>('/auth/login', request, undefined, context);
}
