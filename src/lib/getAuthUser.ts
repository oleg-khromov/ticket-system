'use server';
import { cache } from 'react';
import { decrypt, getSession } from '@/lib/session';

export const getAuthUser = cache(async () => {
	const session = await getSession();

	if (session) {
		const user = await decrypt(session);
		return user;
	}
});
