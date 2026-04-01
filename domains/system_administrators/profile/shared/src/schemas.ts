import { z } from 'zod';

export const profileSchema = z.object({
	actorType: z.string().min(1),
	id: z.string().min(1).optional(),
	genderId: z.string().optional().default(''),
	names: z.array(
		z.object({
			id: z.string().min(1).optional(),
			localeCode: z.string().min(1),
			firstName: z.string().default(''),
			middleNames: z.string().default(''),
			lastName: z.string().default(''),
			nickname: z.string().default('')
		})
	),
	contacts: z.array(
		z.object({
			id: z.string().min(1).optional(),
			typeName: z.string().min(1),
			typeId: z.string().min(1).optional(),
			value: z.string().default(''),
			verified: z.boolean(),
			isPrimary: z.boolean()
		})
	),
	locales: z.array(
		z.object({
			id: z.string().min(1).optional(),
			localeCode: z.string().min(1),
			localeId: z.string().min(1),
			isPrimary: z.boolean()
		})
	)
});
