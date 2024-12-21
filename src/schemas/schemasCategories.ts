import { z } from 'zod';

export const AddCategoryFormSchema = z.object({
	title: z.string().min(3, { message: 'Minimum 3 characters.' }).trim(),
});

export const UpdateCategoryFormSchema = z
	.object({
		id: z.string().trim(),
		title: z.string().min(3, { message: 'Minimum 3 characters.' }).trim(),
		currentTitle: z.string().trim(),
	})
	.superRefine((value, ctx) => {
		if (value.title === value.currentTitle) {
			ctx.addIssue({
				code: z.ZodIssueCode.custom,
				message: 'The current title the same.',
				path: ['title'],
			});
		}
	});
