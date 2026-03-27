import { z } from 'zod';

export const profileSchema = z.object({
	actorType: z.string().min(1),
	displayName: z.string().min(1),
	email: z.string().email().optional()
});
