'use server';
import { getUserWithUnresolvedTickets, deleteUser } from '@/queries';
import { redirect } from 'next/navigation';

export async function actionDeleteUser(
	id: number,
): Promise<{ errors?: string; success?: string } | undefined> {
	console.log(id, 33333);
	const existingTickets = await getUserWithUnresolvedTickets(id);

	if (existingTickets)
		return {
			errors: 'This user has unresolved tickets.',
		};

	console.log(existingTickets, 4444);

	const deletedUser = await deleteUser(id);

	console.log(deletedUser, 5555);

	if (deletedUser)
		return {
			success: `User ${deletedUser.firstName} ${deletedUser.lastName} has deleted successfully`,
		};

	redirect('/users');
}
