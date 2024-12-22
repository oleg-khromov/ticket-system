'use server';
import { deleteSession } from '@/lib/session';
import { redirect } from 'next/navigation';
import { routes } from '@/utils/constants';

export async function actionLogout() {
	await deleteSession();
	redirect(routes.HOME);
}
