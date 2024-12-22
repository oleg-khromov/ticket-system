'use client';
import { useEffect, useState, useActionState } from 'react';
import { actionGetUser, actionUpdateUser } from '@/actions/users';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { routes } from '@/utils/constants';
import { Button } from '@/components/ui';
import { FormInputBox } from '@/components/';
import { IUser, RoleType } from '@/types/interfaces';

export default function EditUser() {
	const { id } = useParams<{ id: string }>();
	const [user, setUser] = useState<IUser | null>(null);
	const [state, action, isPending] = useActionState(
		actionUpdateUser,
		undefined,
	);
	const [selectedRole, setSelectedRole] = useState(
		state?.data?.role || 'ADMIN',
	);

	useEffect(() => {
		if (id) {
			const fetchUser = async () => {
				const fetchedUser = await actionGetUser(parseInt(id));
				setUser(fetchedUser);
				setSelectedRole(fetchedUser?.role || 'ADMIN');
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
						{/* <div>
							<label htmlFor="firstName">First Name</label>
							<input
								id="firstName"
								type="text"
								name="firstName"
								autoComplete="off"
								defaultValue={(state?.firstName || user.firstName) ?? ''}
							/>
							{state?.errors?.firstName && (
								<p className="error">{state.errors.firstName}</p>
							)}
						</div> */}
						<FormInputBox
							id="lastName"
							name="lastName"
							labelText="Last Name"
							defaultValue={(state?.data?.lastName || user.lastName) ?? ''}
							errors={state?.errors?.lastName}
						/>
						{/* <div>
							<label htmlFor="lastName">Last Name</label>
							<input
								id="lastName"
								type="text"
								name="lastName"
								autoComplete="off"
								defaultValue={(state?.lastName || user.lastName) ?? ''}
							/>
							{state?.errors?.lastName && (
								<p className="error">{state.errors.lastName}</p>
							)}
						</div> */}
						<FormInputBox
							id="email"
							name="email"
							labelText="Email"
							defaultValue={(state?.data?.email || user.email) ?? ''}
							errors={state?.errors?.email}
						/>
						{/* <div>
							<label htmlFor="email">Email</label>
							<input
								id="email"
								type="text"
								name="email"
								autoComplete="off"
								defaultValue={(state?.email || user.email) ?? ''}
							/>
							{state?.errors?.email && (
								<p className="error">{state.errors.email}</p>
							)}
						</div> */}
						{/* <FormInputBox
							id="role"
							name="role"
							labelText="Role"
							value={selectedRole}
							errors={state?.errors?.role}
						/> */}
						<div>
							<label htmlFor="role">Role</label>
							<select
								id="role"
								name="role"
								value={selectedRole}
								onChange={(e) => setSelectedRole(e.target.value as RoleType)}
								// defaultValue={
								// 	state?.role === 'ADMIN' || user.role === 'ADMIN'
								// 		? 'ADMIN'
								// 		: 'USER'
								// }
							>
								<option value="ADMIN">ADMIN</option>
								<option value="USER">USER</option>
							</select>
							{state?.errors?.role && (
								<p className="error">{state.errors.role}</p>
							)}
						</div>
						<FormInputBox
							id="phoneNumber"
							name="phoneNumber"
							labelText="Phone Number"
							defaultValue={
								(state?.data?.phoneNumber || user.phoneNumber) ?? ''
							}
							errors={state?.errors?.phoneNumber}
						/>
						{/* <div>
							<label htmlFor="phoneNumber">Phone Number</label>
							<input
								id="phoneNumber"
								type="text"
								name="phoneNumber"
								autoComplete="off"
								defaultValue={(state?.phoneNumber || user.phoneNumber) ?? ''}
							/>
							{state?.errors?.phoneNumber && (
								<p className="error">{state.errors.phoneNumber}</p>
							)}
						</div> */}
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
