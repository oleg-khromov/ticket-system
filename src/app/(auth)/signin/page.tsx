'use client';
import { useActionState } from 'react';
import { actionSignin } from '@/actions/auth';
import { FormSignIn } from '@/components';
import { Heading } from '@/components/ui';
import { useFormToast } from '@/hooks';

export default function SignIn() {
	const [state, action, isPending] = useActionState(actionSignin, undefined);
	useFormToast(state);
	return (
		<div className="auth-page">
			<div className="container w-1/2">
				<Heading content="Sign In" className="mb-6" />
				<FormSignIn action={action} isPending={isPending} state={state} />
			</div>
		</div>
	);
}
