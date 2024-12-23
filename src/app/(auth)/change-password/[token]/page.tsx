'use client';
import { useActionState } from 'react';
import { actionChangePassword } from '@/actions/auth';
import { useParams } from 'next/navigation';
import { Heading } from '@/components/ui';
import { FormChangePassword } from '@/components/';
import { useFormToast } from '@/hooks';

export default function ChangePassword() {
	const { token } = useParams();
	const [state, action, isPending] = useActionState(
		actionChangePassword,
		undefined,
	);
	useFormToast(state);
	return (
		<div className="auth-page">
			<div className="container w-1/2">
				<Heading content="Change password" />
				<p className="small-text">
					Set new password to change your current password.
				</p>
				<FormChangePassword
					action={action}
					isPending={isPending}
					state={state}
					token={token as string}
				/>
			</div>
		</div>
	);
}
