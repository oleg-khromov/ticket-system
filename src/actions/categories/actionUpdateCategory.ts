'use server';
import { UpdateCategoryFormSchema } from '@/schemas';
import { getCategoryByTitle, updateCategory } from '@/queries';

export interface UpdateCategoryFormState {
	errors?: Record<string, string | string[]>;
	message?: string;
	title?: string;
}

export async function actionUpdateCategory(
	state: UpdateCategoryFormState | undefined,
	formData: FormData,
): Promise<UpdateCategoryFormState | undefined> {
	const category = {
		id: formData.get('id') as string,
		title: formData.get('title') as string,
		currentTitle: formData.get('currentTitle') as string,
	};

	const validatedFields = UpdateCategoryFormSchema.safeParse(category);
	console.log(validatedFields);

	if (!validatedFields.success)
		return {
			errors: validatedFields.error.flatten().fieldErrors,
			...category,
		};

	const { id, title } = validatedFields.data;

	const existingCategory = await getCategoryByTitle(title);

	if (existingCategory)
		return {
			errors: {
				title: 'A category with that title already exist in the system.',
			},
			...category,
		};

	const updatedCategory = await updateCategory(parseInt(id), { title });

	if (!updatedCategory)
		return {
			...category,
			message: 'An error occurred while updating category.',
		};

	return {
		...category,
		message: 'Category title has updated successfully.',
	};
}
