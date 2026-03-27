import type {
	LoginRequestDto,
	SessionDto
} from '@twyr/system-administrators-session-management-shared';
import { coreApi } from './core-api';

export async function login(request: LoginRequestDto): Promise<SessionDto> {
	return coreApi.post<SessionDto>('/auth/login', request);
}
