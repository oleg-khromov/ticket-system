'use server';
import { getTicketById } from '@/queries';

export async function actionGetTicket(id: number) {
	return await getTicketById(id);
}
