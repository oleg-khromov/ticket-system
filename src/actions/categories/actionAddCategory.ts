'use server';
import { AddCategoryFormSchema } from '@/schemas';
import { getCategoryByTitle, createCategory } from '@/queries';
import { IActionFormState } from '@/types/interfaces';
import { validateForm } from '@/utils/utils';

export async function actionAddCategory(
	state: IActionFormState | undefined,
	formData: FormData,
): Promise<IActionFormState | undefined> {
	const validatedForm = validateForm(formData, AddCategoryFormSchema);
	if (!validatedForm.success) return validatedForm;

	const { data } = validatedForm;

	const existingCategory = await getCategoryByTitle(data.title);

	if (existingCategory)
		return {
			errors: {
				title: 'This category already exist in the system.',
			},
			data,
		};

	const createdCategory = await createCategory(data);

	if (!createdCategory)
		return {
			message: 'An error occurred while creating new category.',
		};

	return {
		message: 'New category has added successfully.',
		success: true,
	};
}
