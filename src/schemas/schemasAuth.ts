import { z } from 'zod';

export const SignInFormSchema = z.object({
	email: z.string().email({ message: 'Please enter a valid email.' }).trim(),
	password: z.string().min(1, { message: 'Password is required.' }).trim(),
});

export const SignUpFormSchema = z
	.object({
		firstName: z.string().min(3, { message: 'Minimum 3 characters.' }).trim(),
		lastName: z.string().min(3, { message: 'Minimum 3 characters.' }).trim(),
		phoneNumber: z.string().trim().optional(),
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

export const ResetPasswordFormSchema = z.object({
	email: z.string().email({ message: 'Please enter a valid email.' }).trim(),
});

export const ChangePasswordFormSchema = z
	.object({
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
