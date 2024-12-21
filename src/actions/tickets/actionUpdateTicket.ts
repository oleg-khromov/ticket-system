'use server';
import { AddTicketFormSchema } from '@/schemas';
import { getAuthUser } from '@/lib/getAuthUser';
import {
	updateTicket,
	updateTicketStatus,
	updateTicketAssignedTo,
} from '@/queries';
import { StatusType } from '@/types/interfaces';

export interface UpdateTicketFormState {
	errors?: Record<string, string | string[]>;
	message?: string;
	title?: string;
	content?: string;
	categoryId?: string;
}

export async function actionUpdateTicket(
	state: UpdateTicketFormState | undefined,
	formData: FormData,
): Promise<UpdateTicketFormState | undefined> {
	const ticket = {
		categoryId: formData.get('categoryId') as string,
		title: formData.get('title') as string,
		content: formData.get('content') as string,
	};

	const validatedFields = AddTicketFormSchema.safeParse(ticket);
	console.log(validatedFields);

	if (!validatedFields.success)
		return {
			errors: validatedFields.error.flatten().fieldErrors,
			...ticket,
		};

	const { categoryId } = validatedFields.data;
	const id = formData.get('id') as string;

	const user = await getAuthUser();

	const updatedTicket = await updateTicket(parseInt(id), {
		...ticket,
		createdBy: parseInt(user?.userId as string),
		categoryId: parseInt(categoryId),
	});

	if (!updatedTicket)
		return {
			...ticket,
			message: 'An error occurred while updating ticket.',
		};

	return {
		...ticket,
		message: 'Ticket has updated successfully.',
	};
}

export async function actionUpdateTicketStatus(id: string, status: StatusType) {
	const updatedTicket = await updateTicketStatus(parseInt(id), status);

	if (!updatedTicket)
		return {
			message: 'An error occurred while updating ticket.',
		};

	return {
		result: updatedTicket,
		message: 'Ticket has updated successfully.',
	};
}

export async function actionUpdateTicketAssignedTo(
	id: string,
	assignedTo: number,
) {
	const updatedTicket = await updateTicketAssignedTo(parseInt(id), assignedTo);

	if (!updatedTicket)
		return {
			message: 'An error occurred while updating ticket.',
		};

	return {
		result: updatedTicket,
		message: 'Ticket has updated successfully.',
	};
}
