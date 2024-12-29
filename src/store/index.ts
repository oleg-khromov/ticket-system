import { create } from 'zustand';
import { createUsersSlice, IUsersState } from '@/store/slices/usersSlice';
import {
	createCategoriesSlice,
	ICategoriesState,
} from '@/store/slices/categoriesSlice';
import { createTicketsSlice, ITicketsState } from '@/store/slices/ticketsSlice';

type GlobalState = IUsersState & ICategoriesState & ITicketsState;

export const useAppStore = create<GlobalState>()((...a) => ({
	...createUsersSlice(...a),
	...createCategoriesSlice(...a),
	...createTicketsSlice(...a),
}));
