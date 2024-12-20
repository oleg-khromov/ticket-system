'use client';
import { useEffect, useState, useActionState } from 'react';
import { getUser, updateUser } from '@/actions/users';
import Link from 'next/link';
import { useParams } from 'next/navigation';

type Role = 'ADMIN' | 'USER';
// enum Role {
// 	ADMIN = 'ADMIN',
// 	USER = 'USER',
// }

interface IUser {
	id: number;
	firstName?: string;
	lastName?: string;
	email?: string;
	role?: Role;
	phoneNumber?: string | null;
	createdAt?: Date;
	updatedAt?: Date;
	password?: string;
}

export default function EditUser() {
	const { id } = useParams<{ id: string }>();
	const [user, setUser] = useState<IUser | null>(null);
	const [state, action, isPending] = useActionState(updateUser, undefined);
	const [selectedRole, setSelectedRole] = useState(state?.role || 'ADMIN');

	useEffect(() => {
		if (id) {
			const fetchUser = async () => {
				const fetchedUser = await getUser(parseInt(id));
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
				<Link href="/users" className="text-link">
					Back to all users
				</Link>
			</div>
			{user ? (
				<div className="container w-3/4">
					<form action={action} autoComplete="off" className="space-y-4">
						<input type="hidden" name="id" value={id} />
						<div>
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
						</div>
						<div>
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
						</div>
						<div>
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
						</div>
						<div>
							<label htmlFor="role">Role</label>
							<select
								id="role"
								name="role"
								value={selectedRole}
								onChange={(e) => setSelectedRole(e.target.value as Role)}
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
						<div>
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
						</div>
						<div className="flex items-end gap-4">
							<button disabled={isPending} className="btn-primary">
								Edit user
							</button>
						</div>
					</form>
				</div>
			) : (
				''
			)}
		</div>
	);
}
