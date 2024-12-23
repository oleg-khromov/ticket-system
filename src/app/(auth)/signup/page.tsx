'use client';
import { useActionState } from 'react';
import { actionSignup } from '@/actions/auth';
import { Heading } from '@/components/ui';
import { FormSignUp } from '@/components/';
import { useFormToast } from '@/hooks';

export default function SignUp() {
	const [state, action, isPending] = useActionState(actionSignup, undefined);
	useFormToast(state);
	return (
		<div className="auth-page">
			<div className="container w-1/2">
				<Heading content="Sign Up" />
				<FormSignUp action={action} isPending={isPending} state={state} />
			</div>
		</div>
	);
}
