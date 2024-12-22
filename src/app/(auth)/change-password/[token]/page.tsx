'use client';
import { useActionState } from 'react';
import { actionChangePassword } from '@/actions/auth';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { routes } from '@/utils/constants';
import { Button } from '@/components/ui';
import { FormInputBox } from '@/components/';

export default function ChangePassword() {
	const { token } = useParams();
	const [state, action, isPending] = useActionState(
		actionChangePassword,
		undefined,
	);
	return (
		<div className="auth-page">
			<div className="container w-1/2">
				{state?.success ? (
					<>
						<h1 className="title">Password has changed</h1>
						<p className="small-text">
							Password has been changed successfully.
						</p>
						<p className="small-text">
							<Link href={routes.SIGNIN} className="text-link">
								Back to Sign In
							</Link>
						</p>
					</>
				) : (
					<>
						<h1 className="title">Change password</h1>
						<p className="small-text">
							Set new password to change your current password.
						</p>
						{state?.message ? <p className="error">{state.message}</p> : ''}
						<form action={action} autoComplete="off" className="space-y-4">
							<input type="hidden" name="token" value={token || ''} />
							<FormInputBox
								id="password"
								name="password"
								type="password"
								labelText="Password"
								errors={state?.errors?.password}
								required={true}
							/>
							<FormInputBox
								id="confirmPassword"
								name="confirmPassword"
								type="password"
								labelText="Confirm Password"
								errors={state?.errors?.confirmPassword}
								required={true}
							/>
							<div className="flex items-end gap-4">
								<Button text="Change password" disabled={isPending} />
								<Link href={routes.SIGNUP} className="text-link">
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
