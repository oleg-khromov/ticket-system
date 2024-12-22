'use server';
import { getUsers, getUsersByRole } from '@/queries';
import { USER_ROLE, RoleType } from '@/types/interfaces';

export async function actionGetUsers() {
	return await getUsers();
}

export async function actionGetUsersByRole(role: RoleType = USER_ROLE.USER) {
	return await getUsersByRole(role);
}
