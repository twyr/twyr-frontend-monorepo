import { z } from 'zod';

export const loginRequestSchema = z.object({
	identifier: z.string().min(1),
	otp: z.string().min(4)
});

export const sessionSchema = z.object({
	actorType: z.string().min(1),
	accessToken: z.string().min(1),
	refreshToken: z.string().min(1)
});
