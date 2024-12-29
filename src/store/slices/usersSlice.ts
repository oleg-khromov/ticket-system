import { StateCreator } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import { produce } from 'immer';
import { IUser } from '@/types/interfaces';

export interface IUsersState {
	users: IUser[];
	setUsers: (users: IUser[]) => void;
	addUser: (user: IUser) => void;
	editUser: (id: number, updates: IUsersState) => void;
	deleteUser: (id: number) => void;
}

const usersSlice: StateCreator<IUsersState, [], [], IUsersState> = (set) => ({
	users: [],
	setUsers: (users: IUser[]) =>
		set(
			produce((state: IUsersState) => {
				state.users = users;
			}),
		),
	addUser: (user: IUser) =>
		set(
			produce((state: IUsersState) => {
				state.users.push(user);
			}),
		),
	editUser: (id: number, updates: IUsersState) =>
		set(
			produce((state: IUsersState) => {
				const user = state.users.find((u) => u.id === id);
				if (user) Object.assign(user, updates);
			}),
		),
	deleteUser: (id: number) =>
		set(
			produce((state: IUsersState) => {
				state.users = state.users.filter((user) => user.id !== id);
			}),
		),
});

export const createUsersSlice = persist(
	devtools(usersSlice, { name: 'usersStore' }),
	{ name: 'usersStore' },
);
