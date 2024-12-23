'use client';
import React from 'react';
import { FormInputBox, FormSelectBox } from '@/components';
import { Form, Button } from '@/components/ui';
import { USER_ROLE, IUser, IForm } from '@/types/interfaces';

interface IFormEditUser extends IForm {
	id: string;
	user: IUser | null;
	selectedRole: string;
	// eslint-disable-next-line no-unused-vars
	setSelectedRole: (role: string) => void;
}

export default function FormEditUser({
	action,
	autoComplete,
	className,
	isPending = false,
	state,
	id,
	user,
	selectedRole,
	setSelectedRole,
}: IFormEditUser) {
	const selectRoleOptions = [
		{
			id: USER_ROLE.ADMIN,
			title: USER_ROLE.ADMIN,
		},
		{
			id: USER_ROLE.USER,
			title: USER_ROLE.USER,
		},
	];

	return (
		<Form action={action} autoComplete={autoComplete} className={className}>
			<input type="hidden" name="id" value={id} />
			<FormInputBox
				id="firstName"
				name="firstName"
				labelText="First Name"
				defaultValue={(state?.data?.firstName || user?.firstName) ?? ''}
				errors={state?.errors?.firstName}
			/>
			<FormInputBox
				id="lastName"
				name="lastName"
				labelText="Last Name"
				defaultValue={(state?.data?.lastName || user?.lastName) ?? ''}
				errors={state?.errors?.lastName}
			/>
			<FormInputBox
				id="email"
				name="email"
				labelText="Email"
				defaultValue={(state?.data?.email || user?.email) ?? ''}
				errors={state?.errors?.email}
			/>
			<FormSelectBox
				id="role"
				name="role"
				labelText="Role"
				value={selectedRole}
				options={selectRoleOptions}
				onChange={(e) => setSelectedRole(e.target.value)}
				errors={state?.errors?.category}
			/>
			<FormInputBox
				id="phoneNumber"
				name="phoneNumber"
				labelText="Phone Number"
				defaultValue={(state?.data?.phoneNumber || user?.phoneNumber) ?? ''}
				errors={state?.errors?.phoneNumber}
			/>
			<div className="flex items-end gap-4">
				<Button text="Edit user" disabled={isPending} />
			</div>
		</Form>
	);
}
