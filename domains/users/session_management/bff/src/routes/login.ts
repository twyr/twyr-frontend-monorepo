import type { LoginRequestDto } from '@twyr/users-session-management-shared';
import { loginRequestSchema } from '@twyr/users-session-management-shared';
import { login } from '../services/aggregator';

export async function loginRoute(body: LoginRequestDto) {
	const request = loginRequestSchema.parse(body);
	return login(request);
}
