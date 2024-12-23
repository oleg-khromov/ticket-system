'use client';
import { useEffect, useState, useActionState } from 'react';
import { actionGetUser, actionUpdateUser } from '@/actions/users';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { routes } from '@/utils/constants';
import { Heading } from '@/components/ui';
import { FormEditUser } from '@/components';
import { IUser, USER_ROLE } from '@/types/interfaces';
import { useFormToast } from '@/hooks';

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
	useFormToast(state);
	return (
		<div>
			<Heading content={`Edit user ${user?.firstName} ${user?.lastName}`} />
			<div className="mb-10">
				<Link href={routes.USERS} className="text-link">
					Back to all users
				</Link>
			</div>
			{user ? (
				<div className="container w-3/4">
					<FormEditUser
						action={action}
						isPending={isPending}
						state={state}
						id={id}
						user={user}
						selectedRole={selectedRole}
						setSelectedRole={setSelectedRole}
					/>
				</div>
			) : (
				''
			)}
		</div>
	);
}
