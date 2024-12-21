import prisma from '@/lib/db';
import { ICategory } from '@/types/interfaces';

export async function getCategoryById(id: number) {
	return await prisma.category.findUnique({
		where: {
			id,
		},
	});
}

export async function getCategoryByTitle(title: string) {
	return await prisma.category.findUnique({
		where: {
			title,
		},
		select: {
			title: true,
		},
	});
}

export async function getCategories() {
	return await prisma.category.findMany({
		orderBy: {
			title: 'asc',
		},
	});
}

export async function createCategory(data: ICategory) {
	return await prisma.category.create({
		data,
	});
}

export async function updateCategory(id: number, data: ICategory) {
	return await prisma.category.update({
		where: {
			id,
			// title: currentTitle,
		},
		data,
	});
}

export async function deleteCategory(id: number) {
	return await prisma.category.delete({
		where: {
			id,
		},
	});
}
