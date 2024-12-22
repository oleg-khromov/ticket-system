'use server';
import { UpdateCategoryFormSchema } from '@/schemas';
import { getCategoryByTitle, updateCategory } from '@/queries';
import { IActionFormState } from '@/types/interfaces';
import { validateForm } from '@/utils/utils';

export async function actionUpdateCategory(
	state: IActionFormState | undefined,
	formData: FormData,
): Promise<IActionFormState | undefined> {
	const validatedForm = validateForm(formData, UpdateCategoryFormSchema);
	if (!validatedForm.success) return validatedForm;
	const { data } = validatedForm;
	const { id, title } = data;

	const existingCategory = await getCategoryByTitle(title);

	if (existingCategory)
		return {
			errors: {
				title: 'A category with that title already exist in the system.',
			},
			data,
		};

	const updatedCategory = await updateCategory(parseInt(id), { title });

	if (!updatedCategory)
		return {
			data,
			message: 'An error occurred while updating category.',
		};

	return {
		data,
		message: 'Category title has updated successfully.',
		success: true,
	};
}
