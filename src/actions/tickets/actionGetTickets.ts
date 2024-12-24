'use server';
import { getTickets, getTicketsByCreatorId } from '@/queries';
import { getAuthUser } from '@/lib/getAuthUser';
import { USER_ROLE } from '@/types/interfaces';

export async function actionGetTickets() {
	const user = await getAuthUser();

	return user?.role === USER_ROLE.ADMIN
		? getTickets()
		: getTicketsByCreatorId(user?.id as number);
}
