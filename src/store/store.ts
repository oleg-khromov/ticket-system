import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';

interface UserStore {
	username: string;
}

export const useUserStore = create(
	devtools(
		// eslint-disable-next-line no-unused-vars
		immer<UserStore>((set) => ({
			username: 'username',
		})),
		{ name: 'user', store: 'user' },
	),
);
