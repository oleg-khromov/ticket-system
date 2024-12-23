'use client';
import { useActionState } from 'react';
import { actionSignup } from '@/actions/auth';
import { FormSignUp } from '@/components';
import { Heading } from '@/components/ui';
import { useFormToast } from '@/hooks';

export default function SignUp() {
	const [state, action, isPending] = useActionState(actionSignup, undefined);
	useFormToast(state);
	return (
		<div className="auth-page">
			<div className="container w-1/2">
				<Heading content="Sign Up" className="mb-6" />
				<FormSignUp action={action} isPending={isPending} state={state} />
			</div>
		</div>
	);
}
