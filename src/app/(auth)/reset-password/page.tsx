'use client';
import { useActionState } from 'react';
import { actionResetPassword } from '@/actions/auth';
import { Heading } from '@/components/ui';
import { FormResetPassword } from '@/components/';
import { useFormToast } from '@/hooks';

export default function ResetPassword() {
	const [state, action, isPending] = useActionState(
		actionResetPassword,
		undefined,
	);
	useFormToast(state);
	return (
		<div className="auth-page">
			<div className="container w-1/2">
				<Heading content="Forgot password?" />
				<p className="small-text">
					Enter the email address you used when you joined and we will send you
					instructions to reset your password.
				</p>
				<FormResetPassword
					action={action}
					isPending={isPending}
					state={state}
				/>
			</div>
		</div>
	);
}
