'use server';
import { AddTicketFormSchema } from '@/schemas';
import { getAuthUser } from '@/lib/getAuthUser';
import { createTicket, getTicketByTitleAndCategoryId } from '@/queries';

export interface AddTicketFormState {
	errors?: Record<string, string | string[]>;
	message?: string;
	title?: string;
	content?: string;
	categoryId?: string;
}

export async function actionAddTicket(
	state: AddTicketFormState | undefined,
	formData: FormData,
): Promise<AddTicketFormState | undefined> {
	const ticket = {
		categoryId: formData.get('categoryId') as string,
		title: formData.get('title') as string,
		content: formData.get('content') as string,
	};
	console.log(ticket, 'ticket');

	const validatedFields = AddTicketFormSchema.safeParse(ticket);

	if (!validatedFields.success)
		return {
			errors: validatedFields.error.flatten().fieldErrors,
			...ticket,
		};

	const { categoryId, title } = validatedFields.data;

	const existingTicket = await getTicketByTitleAndCategoryId(
		title,
		parseInt(categoryId),
	);

	if (existingTicket)
		return {
			errors: {
				title: 'Duplicate. This category already has a ticket with that title.',
			},
			...ticket,
		};

	const user = await getAuthUser();
	console.log(user, 'user');

	const createdTicket = await createTicket({
		...ticket,
		createdBy: parseInt(user?.userId as string),
		categoryId: parseInt(categoryId),
	});

	if (!createdTicket)
		return {
			message: 'An error occurred while creating new ticket.',
		};

	return {
		message: 'New ticket has created successfully.',
	};
}
