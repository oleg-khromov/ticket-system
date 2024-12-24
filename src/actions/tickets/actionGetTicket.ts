'use server';
import { getTicketById } from '@/queries';
import { getAuthUser } from '@/lib/getAuthUser';
import { USER_ROLE } from '@/types/interfaces';

export async function actionGetTicket(id: number) {
	const user = await getAuthUser();
	const ticket = await getTicketById(id);

	if (ticket?.createdBy === user?.id || user?.role === USER_ROLE.ADMIN)
		return ticket;

	return null;
}
