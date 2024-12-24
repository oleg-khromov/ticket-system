'use client';
import React, { useState, useEffect } from 'react';
import { FormInputBox, FormSelectBox } from '@/components';
import { Form, Button } from '@/components/ui';
import { USER_ROLE, IUser, IForm } from '@/types/interfaces';
import { selectRoleOptions } from '@/utils/constants';
import Link from 'next/link';
import { routes } from '@/utils/constants';

interface IFormEditUser extends IForm {
	id: string;
	user: IUser | null;
}

export default function FormEditUser({
	action,
	autoComplete,
	className,
	isPending = false,
	state,
	id,
	user,
}: IFormEditUser) {
	const [selectedRole, setSelectedRole] = useState(
		state?.data?.role || USER_ROLE.ADMIN,
	);

	useEffect(() => {
		setSelectedRole(user?.role || USER_ROLE.ADMIN);
	}, [user]);

	return (
		<Form action={action} autoComplete={autoComplete} className={className}>
			<input type="hidden" name="id" value={id} />
			<FormInputBox
				id="firstName"
				name="firstName"
				labelText="First Name"
				defaultValue={
					((state?.data?.firstName || user?.firstName) as string) ?? ''
				}
				errors={state?.errors?.firstName}
			/>
			<FormInputBox
				id="lastName"
				name="lastName"
				labelText="Last Name"
				defaultValue={
					((state?.data?.lastName || user?.lastName) as string) ?? ''
				}
				errors={state?.errors?.lastName}
			/>
			<FormInputBox
				id="email"
				name="email"
				labelText="Email"
				defaultValue={((state?.data?.email || user?.email) as string) ?? ''}
				errors={state?.errors?.email}
			/>
			<FormSelectBox
				id="role"
				name="role"
				labelText="Role"
				value={selectedRole as string | number}
				options={selectRoleOptions}
				onChange={(e) => setSelectedRole(e.target.value)}
				errors={state?.errors?.category}
			/>
			<FormInputBox
				id="phoneNumber"
				name="phoneNumber"
				labelText="Phone Number"
				defaultValue={
					((state?.data?.phoneNumber || user?.phoneNumber) as string) ?? ''
				}
				errors={state?.errors?.phoneNumber}
			/>
			<div className="flex items-end gap-4 justify-between">
				<Link href={routes.USERS} className="btn-secondary">
					Back
				</Link>
				<Button text="Save" disabled={isPending} />
			</div>
		</Form>
	);
}
