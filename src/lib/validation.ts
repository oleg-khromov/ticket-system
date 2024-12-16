import 'server-only';
import { z } from 'zod';

// const phoneRegex = new RegExp(
// 	/^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([-]?[\s]?[0-9])+$/,
// );

export const SignupFormSchema = z
	.object({
		firstName: z.string().min(3, { message: 'Minimum 3 characters.' }).trim(),
		lastName: z.string().min(3, { message: 'Minimum 3 characters.' }).trim(),
		phoneNumber: z
			.string()
			// .regex(phoneRegex, {
			// 	message: 'Invalid phone number.',
			// })
			.trim()
			.optional(),
		email: z.string().email({ message: 'Please enter a valid email.' }).trim(),
		password: z
			.string()
			.min(1, { message: 'Not be empty.' })
			.min(8, { message: 'Be at least 8 characters long.' })
			.regex(/[a-z]/, { message: 'Contain at least one letter.' })
			.regex(/[A-Z]/, { message: 'Contain at least one uppercase letter.' })
			.regex(/[0-9]/, { message: 'Contain at least one number.' })
			.regex(/[^a-zA-Z0-9]/, {
				message: 'Contain at least one special character.',
			})
			.trim(),
		confirmPassword: z.string().trim(),
	})
	.superRefine((value, ctx) => {
		if (value.password !== value.confirmPassword) {
			ctx.addIssue({
				code: z.ZodIssueCode.custom,
				message: 'Password fields do not match.',
				path: ['confirmPassword'],
			});
		}
	});
