'use client';
import { useActionState } from 'react';
import { resetPassword } from '@/actions/auth';
import Link from 'next/link';

export default function ResetPassword() {
	const [state, action, isPending] = useActionState(resetPassword, undefined);
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
							<Link href="/signin" className="text-link">
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
							<div>
								<label htmlFor="email">Email</label>
								<input
									id="email"
									type="text"
									name="email"
									autoComplete="off"
									defaultValue={state?.email ?? ''}
								/>
								{state?.errors?.email && (
									<p className="error">{state.errors.email}</p>
								)}
							</div>
							<div className="flex items-end gap-4">
								<button disabled={isPending} className="btn-primary">
									Reset password
								</button>
								<Link href="/signin" className="text-link">
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
