'use client';
import { useActionState } from 'react';
import { changePassword } from '@/actions/auth';
import Link from 'next/link';
import { useParams } from 'next/navigation';

export default function ChangePassword() {
	const { token } = useParams();
	const [state, action, isPending] = useActionState(changePassword, undefined);
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
							<Link href="/signin" className="text-link">
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
							<div>
								<label htmlFor="password">
									Password<span className="mandatory">*</span>
								</label>
								<input
									id="password"
									type="password"
									name="password"
									autoComplete="off"
								/>
								{state?.errors?.password &&
									(Array.isArray(state.errors.password) ? (
										<div className="error">
											<p>Password must:</p>
											<ul className="list-disc list-inside ml-4">
												{state.errors.password.map((error) => (
													<li key={error}>{error}</li>
												))}
											</ul>
										</div>
									) : (
										<p className="error">{state.errors.password}</p>
									))}
							</div>
							<div>
								<label htmlFor="confirmPassword">
									Confirm Password<span className="mandatory">*</span>
								</label>
								<input
									id="confirmPassword"
									type="password"
									name="confirmPassword"
									autoComplete="off"
								/>
								{state?.errors?.confirmPassword && (
									<p className="error">{state.errors.confirmPassword}</p>
								)}
							</div>
							<div className="flex items-end gap-4">
								<button disabled={isPending} className="btn-primary">
									Change password
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
