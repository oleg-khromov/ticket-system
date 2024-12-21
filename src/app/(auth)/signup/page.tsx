'use client';
import { useActionState } from 'react';
import { actionSignup } from '@/actions/auth';
import Link from 'next/link';

export default function SignUp() {
	const [state, action, isPending] = useActionState(actionSignup, undefined);
	return (
		<div className="auth-page">
			<div className="container w-1/2">
				<h1 className="title">Sign Up</h1>
				<form action={action} autoComplete="off" className="space-y-4">
					<div>
						<label htmlFor="firstName">
							First Name<span className="mandatory">*</span>
						</label>
						<input
							id="firstName"
							type="text"
							name="firstName"
							defaultValue={state?.firstName ?? ''}
						/>
						{state?.errors?.firstName && (
							<p className="error">{state.errors.firstName}</p>
						)}
					</div>
					<div>
						<label htmlFor="lastName">
							Last Name<span className="mandatory">*</span>
						</label>
						<input
							id="lastName"
							type="text"
							name="lastName"
							defaultValue={state?.lastName ?? ''}
						/>
						{state?.errors?.lastName && (
							<p className="error">{state.errors.lastName}</p>
						)}
					</div>
					<div>
						<label htmlFor="phoneNumber">Phone Number</label>
						<input
							id="phoneNumber"
							type="text"
							name="phoneNumber"
							defaultValue={state?.phoneNumber ?? ''}
						/>
						{state?.errors?.phoneNumber && (
							<p className="error">{state.errors.phoneNumber}</p>
						)}
					</div>
					<div>
						<label htmlFor="email">
							Email<span className="mandatory">*</span>
						</label>
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
							Sign Up
						</button>
						<Link href="/signin" className="text-link">
							or Sign In here
						</Link>
					</div>
				</form>
			</div>
		</div>
	);
}
