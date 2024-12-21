'use server';
import { getCategories } from '@/queries';

export async function actionGetCategories() {
	return getCategories();
}
