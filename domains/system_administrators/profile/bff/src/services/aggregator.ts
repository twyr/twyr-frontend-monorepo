import type { ProfileDto } from '@twyr/system-administrators-profile-shared';
import { coreApi } from './core-api';

export async function getProfile(): Promise<ProfileDto> {
	return coreApi.get<ProfileDto>('/profile/me');
}
