'use client';
import { useActionState } from 'react';
import { actionResetPassword } from '@/actions/auth';
import { FormResetPassword } from '@/components';
import { Heading } from '@/components/ui';
import { useFormToast } from '@/hooks';

export default function ResetPassword() {
	const [state, action, isPending] = useActionState(
		actionResetPassword,
		undefined,
	);
	useFormToast(state);
	console.log('use token to change your password:', state?.data?.token);
	return (
		<div className="auth-page">
			<div className="container w-1/2">
				<Heading content="Forgot password?" className="mb-6" />
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
