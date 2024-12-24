'use server';
import { cache } from 'react';
import { verifySession } from '@/lib/session';
import { getUserById } from '@/queries';

export const getAuthUser = cache(async () => {
	const payload = await verifySession();
	if (!payload?.userId) return null;

	const user = await getUserById(payload.userId);
	if (!user) return null;

	// eslint-disable-next-line no-unused-vars
	const { id, role, ...rest } = user;

	return { id, role };
});
