'use server';
import prisma from '@/lib/db';
import {
	AddCategoryFormSchema,
	UpdateCategoryFormSchema,
} from '@/lib/validation';
// import { redirect } from 'next/navigation';

export async function getCategories() {
	return await prisma.category.findMany({
		orderBy: {
			title: 'asc',
		},
	});
}

export async function getCategory(id: number) {
	return await prisma.category.findUnique({
		where: {
			id,
		},
	});
}

export async function deleteCategory(
	id: number,
): Promise<{ errors?: string; success?: string } | undefined> {
	console.log(id, 33333);
	const existingTickets = await prisma.ticket.findFirst({
		where: {
			categoryId: id,
		},
	});

	if (existingTickets)
		return {
			errors: 'This category has tickets.',
		};
	const deletedCategory = await prisma.category.delete({
		where: {
			id,
		},
	});

	if (deletedCategory)
		return {
			success: `Category ${deletedCategory.title} has deleted successfully`,
		};

	// redirect('/categories');
}

export interface AddUpdateCategoryFormState {
	errors?: Record<string, string | string[]>;
	message?: string;
	title?: string;
}

export async function addCategory(
	state: AddUpdateCategoryFormState | undefined,
	formData: FormData,
): Promise<AddUpdateCategoryFormState | undefined> {
	const category = {
		title: formData.get('title') as string,
	};

	const validatedFields = AddCategoryFormSchema.safeParse(category);

	if (!validatedFields.success)
		return {
			errors: validatedFields.error.flatten().fieldErrors,
			...category,
		};

	const { title } = validatedFields.data;

	const existingCategory = await prisma.category.findUnique({
		where: {
			title,
		},
		select: {
			title: true,
		},
	});

	if (existingCategory)
		return {
			errors: {
				title: 'This category already exist in the system.',
			},
			...category,
			message: 'HI',
		};

	const createdCategory = await prisma.category.create({
		data: {
			...category,
		},
	});

	if (!createdCategory)
		return {
			message: 'An error occurred while creating new category.',
		};

	return {
		message: 'New category has added successfully.',
	};
}

export async function updateCategory(
	state: AddUpdateCategoryFormState | undefined,
	formData: FormData,
): Promise<AddUpdateCategoryFormState | undefined> {
	const category = {
		id: formData.get('id') as string,
		title: formData.get('title') as string,
		currentTitle: formData.get('currentTitle') as string,
	};
	console.log(category);

	const validatedFields = UpdateCategoryFormSchema.safeParse(category);
	console.log(validatedFields);

	if (!validatedFields.success)
		return {
			errors: validatedFields.error.flatten().fieldErrors,
			...category,
		};

	const { id, title, currentTitle } = validatedFields.data;

	const existingCategory = await prisma.category.findUnique({
		where: {
			title,
		},
		select: {
			title: true,
		},
	});

	if (existingCategory)
		return {
			errors: {
				title: 'A category with that title already exist in the system.',
			},
			...category,
		};

	const createdCategory = await prisma.category.update({
		where: {
			id: parseInt(id),
			title: currentTitle,
		},
		data: {
			title,
		},
	});

	if (!createdCategory)
		return {
			...category,
			message: 'An error occurred while creating new category.',
		};

	return {
		...category,
		message: 'Category title has updated successfully.',
	};
}
