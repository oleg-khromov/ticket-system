import { z } from 'zod';

export const UpdateUserFormSchema = z.object({
	id: z.string().trim(),
	firstName: z.string().min(3, { message: 'Minimum 3 characters.' }).trim(),
	lastName: z.string().min(3, { message: 'Minimum 3 characters.' }).trim(),
	phoneNumber: z.string().trim().optional(),
	email: z.string().email({ message: 'Please enter a valid email.' }).trim(),
	role: z.string().trim(),
});
