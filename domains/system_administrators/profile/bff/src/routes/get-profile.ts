import type { ApiRequestContext } from '@twyr/core';
import { getProfile } from '../services/aggregator';

export async function getProfileRoute(context?: ApiRequestContext) {
	return getProfile(context);
}
