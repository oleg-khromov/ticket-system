'use server';
import { AddCategoryFormSchema } from '@/schemas';
import { getCategoryByTitle, createCategory } from '@/queries';

export interface AddCategoryFormState {
	errors?: Record<string, string | string[]>;
	message?: string;
	title?: string;
}

export async function actionAddCategory(
	state: AddCategoryFormState | undefined,
	formData: FormData,
): Promise<AddCategoryFormState | undefined> {
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

	const existingCategory = await getCategoryByTitle(title);

	if (existingCategory)
		return {
			errors: {
				title: 'This category already exist in the system.',
			},
			...category,
			message: 'HI',
		};

	const createdCategory = await createCategory(category);

	if (!createdCategory)
		return {
			message: 'An error occurred while creating new category.',
		};

	return {
		message: 'New category has added successfully.',
	};
}
