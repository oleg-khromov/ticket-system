'use server';
import { deleteCategory, getTicketByCategoryId } from '@/queries';

export async function actionDeleteCategory(
	id: number,
): Promise<{ errors?: string; success?: string } | undefined> {
	console.log(id, 33333);
	const existingTickets = await getTicketByCategoryId(id);

	if (existingTickets)
		return {
			errors: 'This category has tickets.',
		};

	const deletedCategory = await deleteCategory(id);

	if (deletedCategory)
		return {
			success: `Category ${deletedCategory.title} has deleted successfully`,
		};
}
