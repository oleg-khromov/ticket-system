'use server';
import { getUserWithUnresolvedTickets, deleteUser } from '@/queries';
import { IActionFormState } from '@/types/interfaces';

export async function actionDeleteUser(
	id: number,
): Promise<IActionFormState | undefined> {
	const existingTickets = await getUserWithUnresolvedTickets(id);
	if (existingTickets)
		return {
			message: 'This user has unresolved tickets.',
		};

	const deletedUser = await deleteUser(id);
	if (deletedUser)
		return {
			message: `User ${deletedUser.firstName} ${deletedUser.lastName} has deleted successfully`,
			success: true,
		};
}
