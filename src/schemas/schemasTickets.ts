import { z } from 'zod';

export const AddTicketFormSchema = z.object({
	categoryId: z.string().trim(),
	title: z.string().min(3, { message: 'Minimum 3 characters.' }).trim(),
	content: z.string().min(10, { message: 'Minimum 10 characters.' }).trim(),
});
