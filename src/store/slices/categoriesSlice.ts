import { StateCreator } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import { produce } from 'immer';
import { ICategory } from '@/types/interfaces';

export interface ICategoriesState {
	categories: ICategory[];
	setCategories: (categories: ICategory[]) => void;
	addCategory: (category: ICategory) => void;
	editCategory: (id: number, title: string) => void;
	deleteCategory: (id: number) => void;
}

const categoriesSlice: StateCreator<
	ICategoriesState,
	[],
	[],
	ICategoriesState
> = (set) => ({
	categories: [],
	setCategories: (categories: ICategory[]) =>
		set(
			produce((state: ICategoriesState) => {
				state.categories = categories;
			}),
		),
	addCategory: (category: ICategory) =>
		set(
			produce((state: ICategoriesState) => {
				state.categories.push(category);
			}),
		),
	editCategory: (id: number, title: string) =>
		set(
			produce((state: ICategoriesState) => {
				const category = state.categories.find((cat) => cat.id === id);
				if (category) category.title = title;
			}),
		),
	deleteCategory: (id: number) =>
		set(
			produce((state: ICategoriesState) => {
				state.categories = state.categories.filter(
					(category) => category.id !== id,
				);
			}),
		),
});

export const createCategoriesSlice = persist(
	devtools(categoriesSlice, { name: 'categoryStore' }),
	{ name: 'categoryStore' },
);
