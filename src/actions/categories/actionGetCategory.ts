'use server';
import { getCategoryById } from '@/queries';

export async function actionGetCategory(id: number) {
	return await getCategoryById(id);
}
