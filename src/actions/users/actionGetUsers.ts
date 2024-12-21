'use server';
import { getUsers, getUsersByRole } from '@/queries';
import { ROLE, RoleType } from '@/types/interfaces';

export async function actionGetUsers() {
	return await getUsers();
}

export async function actionGetUsersByRole(role: RoleType = ROLE.USER) {
	return await getUsersByRole(role);
}
