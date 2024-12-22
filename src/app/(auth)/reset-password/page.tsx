'use client';
import { useActionState } from 'react';
import { actionResetPassword } from '@/actions/auth';
import Link from 'next/link';
import { routes } from '@/utils/constants';
import { Button } from '@/components/ui';
import { FormInputBox } from '@/components/';

export default function ResetPassword() {
	const [state, action, isPending] = useActionState(
		actionResetPassword,
		undefined,
	);
	return (
		<div className="auth-page">
			<div className="container w-1/2">
				{state?.success ? (
					<>
						<h1 className="title">Check your email</h1>
						<p className="small-text">
							An email has been sent to your email address to reset your
							password.
						</p>
						<p className="small-text">
							<Link href={routes.SIGNIN} className="text-link">
								Back to Sign In
							</Link>
						</p>
					</>
				) : (
					<>
						<h1 className="title">Forgot password?</h1>
						<p className="small-text">
							Enter the email address you used when you joined and we will send
							you instructions to reset your password.
						</p>
						<form action={action} autoComplete="off" className="space-y-4">
							<FormInputBox
								id="email"
								name="email"
								labelText="Email"
								defaultValue={state?.data?.email ?? ''}
								errors={state?.errors?.email}
							/>
							<div className="flex items-end gap-4">
								<Button text="Reset password" disabled={isPending} />
								<Link href={routes.SIGNIN} className="text-link">
									or back to Sign In
								</Link>
							</div>
						</form>
					</>
				)}
			</div>
		</div>
	);
}
