'use server';
import { deleteCategory, getTicketByCategoryId } from '@/queries';
import { IActionFormState } from '@/types/interfaces';

export async function actionDeleteCategory(
	id: number,
): Promise<IActionFormState | undefined> {
	const existingTickets = await getTicketByCategoryId(id);

	if (existingTickets)
		return {
			message: 'This category has tickets.',
		};

	const deletedCategory = await deleteCategory(id);

	if (deletedCategory)
		return {
			message: `Category ${deletedCategory.title} has deleted successfully`,
			success: true,
		};
}
