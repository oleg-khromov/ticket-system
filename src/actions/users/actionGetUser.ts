'use server';
import { getUserById } from '@/queries';

export async function actionGetUser(id: number) {
	return await getUserById(id);
}
