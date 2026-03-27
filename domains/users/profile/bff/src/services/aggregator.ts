import type { ProfileDto } from '@twyr/users-profile-shared';
import { coreApi } from './core-api';

export async function getProfile(): Promise<ProfileDto> {
	return coreApi.get<ProfileDto>('/profile/me');
}
