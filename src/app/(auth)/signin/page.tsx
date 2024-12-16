'use client';
import { useActionState } from 'react';
import { signin } from '@/actions/auth';
import Link from 'next/link';

export default function SignIn() {
	const [state, action, isPending] = useActionState(signin, undefined);
	return (
		<div className="auth-page">
			<div className="container w-1/2">
				<h1 className="title">Sign In</h1>
				<form action={action} autoComplete="off" className="space-y-4">
					<div>
						<label htmlFor="email">Email</label>
						<input type="text" name="email" defaultValue={state?.email ?? ''} />
						{state?.errors?.email && (
							<p className="error">{state.errors.email}</p>
						)}
					</div>
					<div>
						<label htmlFor="password">Password</label>
						<input type="password" name="password" />
						{state?.errors?.password && (
							<p className="error">{state.errors.password}</p>
						)}
					</div>
					<div className="flex items-end gap-4">
						<button disabled={isPending} className="btn-primary">
							Sign In
						</button>
						<Link href="/signup" className="text-link">
							or Sign Up here
						</Link>
					</div>
				</form>
			</div>
		</div>
	);
}
