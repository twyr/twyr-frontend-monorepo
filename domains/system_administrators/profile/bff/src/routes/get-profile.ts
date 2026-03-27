import { getProfile } from '../services/aggregator';

export async function getProfileRoute() {
	return getProfile();
}
