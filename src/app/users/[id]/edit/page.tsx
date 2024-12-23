'use client';
import { useCallback, useActionState } from 'react';
import { actionGetUser, actionUpdateUser } from '@/actions/users';
import { useParams } from 'next/navigation';
import { FormEditUser } from '@/components';
import { Heading } from '@/components/ui';
import { useFormToast, useData } from '@/hooks';

export default function EditUser() {
	const { id } = useParams<{ id: string }>();
	const [state, action, isPending] = useActionState(
		actionUpdateUser,
		undefined,
	);

	const { data: user } = useData(
		useCallback(() => actionGetUser(parseInt(id)), [id]),
		[id, isPending],
	);

	useFormToast(state);
	return (
		<div>
			<Heading
				content={`Edit user: ${user?.firstName} ${user?.lastName}`}
				className="mb-6"
			/>
			{user ? (
				<div className="container w-3/4">
					<FormEditUser
						action={action}
						isPending={isPending}
						state={state}
						id={id}
						user={user}
					/>
				</div>
			) : (
				''
			)}
		</div>
	);
}
