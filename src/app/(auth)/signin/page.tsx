'use client';
import { useActionState, useEffect } from 'react';
import { actionSignin } from '@/actions/auth';
import { FormSignIn } from '@/components';
import { Heading } from '@/components/ui';
import { useFormToast, useAuth } from '@/hooks';
import { USER_ROLE, RoleType } from '@/types/interfaces';
import { routes } from '@/utils/constants';
import { useRouter } from 'next/navigation';

export default function SignIn() {
	const [state, action, isPending] = useActionState(actionSignin, {});
	const { setUser, setIsAdmin } = useAuth();
	const router = useRouter();

	useEffect(() => {
		if (state?.success && state?.data) {
			setUser({
				id: state?.data?.id as number,
				role: state?.data?.role as RoleType,
			});
			setIsAdmin(state?.data?.role === USER_ROLE.ADMIN);
			router.push(routes.TICKETS);
		}
	}, [state]);

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
