import type { ProfileDto } from '@twyr/system-administrators-profile-shared';
import type { ApiRequestContext } from '@twyr/core';
import { coreApi } from './core-api';

export async function getProfile(
	context?: ApiRequestContext
): Promise<ProfileDto> {
	return coreApi.get<ProfileDto>('/profile/me', undefined, context);
}
