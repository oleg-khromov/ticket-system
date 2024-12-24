'use server';
import { AddTicketFormSchema } from '@/schemas';
import { getAuthUser } from '@/lib/getAuthUser';
import {
	updateTicket,
	updateTicketStatus,
	updateTicketAssignedTo,
} from '@/queries';
import { StatusType } from '@/types/interfaces';
import { IActionFormState } from '@/types/interfaces';
import { validateForm } from '@/utils/utils';

export async function actionUpdateTicket(
	state: IActionFormState | undefined,
	formData: FormData,
): Promise<IActionFormState | undefined> {
	const validatedForm = validateForm(formData, AddTicketFormSchema);
	if (!validatedForm.success) return validatedForm;

	const { data } = validatedForm;
	const { categoryId } = data;

	const id = formData.get('id') as string;

	const user = await getAuthUser();

	const updatedTicket = await updateTicket(parseInt(id), {
		...data,
		createdBy: user?.id as number,
		categoryId: parseInt(categoryId),
	});
	if (!updatedTicket)
		return {
			data,
			message: 'An error occurred while updating ticket.',
		};

	return {
		data,
		message: 'Ticket has updated successfully.',
		success: true,
	};
}

export async function actionUpdateTicketStatus(
	id: string,
	status: StatusType,
): Promise<IActionFormState | undefined> {
	const updatedTicket = await updateTicketStatus(parseInt(id), status);
	if (!updatedTicket)
		return {
			message: 'An error occurred while updating ticket.',
		};

	return {
		data: {
			status: updatedTicket.status,
		},
		message: 'Ticket status field has updated successfully.',
		success: true,
	};
}

export async function actionUpdateTicketAssignedTo(
	id: string,
	assignedTo: number,
): Promise<IActionFormState | undefined> {
	const updatedTicket = await updateTicketAssignedTo(parseInt(id), assignedTo);
	if (!updatedTicket)
		return {
			message: 'An error occurred while updating ticket.',
		};

	return {
		data: {
			assignedTo: updatedTicket.assignedTo,
		},
		message: 'Ticket assignedTo field has updated successfully.',
		success: true,
	};
}
