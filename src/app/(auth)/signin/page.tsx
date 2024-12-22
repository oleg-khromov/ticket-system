'use client';
import { useActionState } from 'react';
import { actionSignin } from '@/actions/auth';
import Link from 'next/link';
import { routes } from '@/utils/constants';
import { Button } from '@/components/ui';
import { FormInputBox } from '@/components/';

export default function SignIn() {
	const [state, action, isPending] = useActionState(actionSignin, undefined);
	return (
		<div className="auth-page">
			<div className="container w-1/2">
				<h1 className="title">Sign In</h1>
				<form action={action} autoComplete="off" className="space-y-4">
					<FormInputBox
						id="email"
						name="email"
						labelText="Email"
						defaultValue={state?.data?.email ?? ''}
						errors={state?.errors?.email}
					/>
					{/* <div>
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
					</div> */}
					<FormInputBox
						id="password"
						name="password"
						type="password"
						labelText="Password"
						errors={state?.errors?.password}
					/>
					{/* <div>
						<div className="flex items-center justify-between gap-4">
							<label htmlFor="password">Password</label>
							<Link href={routes.RESET_PASSWORD} className="label-text">
								Forgot Password?
							</Link>
						</div>
						<input
							id="password"
							type="password"
							name="password"
							autoComplete="off"
						/>
						{state?.errors?.password && (
							<p className="error">{state.errors.password}</p>
						)}
					</div> */}
					<Link href={routes.RESET_PASSWORD} className="label-text">
						Forgot Password?
					</Link>
					<div className="flex items-end gap-4">
						<Button text="Sign In" disabled={isPending} />
						<Link href={routes.SIGNUP} className="text-link">
							or Sign Up here
						</Link>
					</div>
				</form>
			</div>
		</div>
	);
}
