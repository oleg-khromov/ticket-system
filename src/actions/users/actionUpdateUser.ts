'use server';
import { UpdateUserFormSchema } from '@/schemas';
import { updateUser, getUsersByEmailAndExcludeById } from '@/queries';
import { USER_ROLE } from '@/types/interfaces';
import { IActionFormState } from '@/types/interfaces';
import { validateForm } from '@/utils/utils';

export async function actionUpdateUser(
	state: IActionFormState | undefined,
	formData: FormData,
): Promise<IActionFormState | undefined> {
	const validatedForm = validateForm(formData, UpdateUserFormSchema);
	if (!validatedForm.success) return validatedForm;

	const { data } = validatedForm;
	const { id, firstName, lastName, email, role, phoneNumber } = data;

	const existingUsers = await getUsersByEmailAndExcludeById(
		parseInt(id),
		email,
	);
	if (existingUsers.length)
		return {
			errors: {
				email: 'A user with that email already exist in the system.',
			},
			data,
		};

	const updatedUser = await updateUser(parseInt(id), {
		firstName,
		lastName,
		email,
		role: role === USER_ROLE.ADMIN ? USER_ROLE.ADMIN : USER_ROLE.USER,
		phoneNumber,
	});
	if (!updatedUser)
		return {
			data,
			message: 'An error occurred while updating user.',
		};

	return {
		data,
		message: 'User has updated successfully.',
		success: true,
	};
}
