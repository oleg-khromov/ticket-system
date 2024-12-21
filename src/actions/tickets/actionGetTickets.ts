'use server';
import { getTickets } from '@/queries';

export async function actionGetTickets() {
	return getTickets();
}
