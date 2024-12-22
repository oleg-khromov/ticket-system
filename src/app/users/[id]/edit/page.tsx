'use client';
import { useEffect, useState, useActionState } from 'react';
import { actionGetUser, actionUpdateUser } from '@/actions/users';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { routes } from '@/utils/constants';
import { Button } from '@/components/ui';
import { FormInputBox, FormSelectBox } from '@/components/';
import { IUser, USER_ROLE } from '@/types/interfaces';

export default function EditUser() {
	const { id } = useParams<{ id: string }>();
	const [user, setUser] = useState<IUser | null>(null);
	const [state, action, isPending] = useActionState(
		actionUpdateUser,
		undefined,
	);
	const [selectedRole, setSelectedRole] = useState(
		state?.data?.role || USER_ROLE.ADMIN,
	);
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

	useEffect(() => {
		if (id) {
			const fetchUser = async () => {
				const fetchedUser = await actionGetUser(parseInt(id));
				setUser(fetchedUser);
				setSelectedRole(fetchedUser?.role || USER_ROLE.ADMIN);
			};
			fetchUser();
		}
	}, [id, isPending]);
	return (
		<div>
			<h1 className="title">
				Edit user {`${user?.firstName} ${user?.lastName}`}
			</h1>
			<div className="mb-10">
				<Link href={routes.USERS} className="text-link">
					Back to all users
				</Link>
			</div>
			{user ? (
				<div className="container w-3/4">
					<form action={action} autoComplete="off" className="space-y-4">
						<input type="hidden" name="id" value={id} />
						<FormInputBox
							id="firstName"
							name="firstName"
							labelText="First Name"
							defaultValue={(state?.data?.firstName || user.firstName) ?? ''}
							errors={state?.errors?.firstName}
						/>
						<FormInputBox
							id="lastName"
							name="lastName"
							labelText="Last Name"
							defaultValue={(state?.data?.lastName || user.lastName) ?? ''}
							errors={state?.errors?.lastName}
						/>
						<FormInputBox
							id="email"
							name="email"
							labelText="Email"
							defaultValue={(state?.data?.email || user.email) ?? ''}
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
							defaultValue={
								(state?.data?.phoneNumber || user.phoneNumber) ?? ''
							}
							errors={state?.errors?.phoneNumber}
						/>
						<div className="flex items-end gap-4">
							<Button text="Edit user" disabled={isPending} />
						</div>
					</form>
				</div>
			) : (
				''
			)}
		</div>
	);
}
