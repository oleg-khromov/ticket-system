'use server';
import { AddTicketFormSchema } from '@/schemas';
import { getAuthUser } from '@/lib/getAuthUser';
import { createTicket, getTicketByTitleAndCategoryId } from '@/queries';
import { IActionFormState } from '@/types/interfaces';
import { validateForm } from '@/utils/utils';

export async function actionAddTicket(
	state: IActionFormState | undefined,
	formData: FormData,
): Promise<IActionFormState | undefined> {
	const validatedForm = validateForm(formData, AddTicketFormSchema);
	if (!validatedForm.success) return validatedForm;

	const { data } = validatedForm;
	const { categoryId, title } = data;

	const existingTicket = await getTicketByTitleAndCategoryId(
		title,
		parseInt(categoryId),
	);

	if (existingTicket)
		return {
			errors: {
				title: 'Duplicate. This category already has a ticket with that title.',
			},
			data,
		};

	const user = await getAuthUser();
	console.log(user, 'user');

	const createdTicket = await createTicket({
		...data,
		createdBy: parseInt(user?.userId as string),
		categoryId: parseInt(categoryId),
	});

	if (!createdTicket)
		return {
			message: 'An error occurred while creating new ticket.',
		};

	return {
		message: 'New ticket has created successfully.',
		success: true,
	};
}
