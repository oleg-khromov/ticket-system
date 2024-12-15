'use client';

import { useActionState } from 'react';
import { register } from '@/app/actions/auth';
import Link from 'next/link';

export default function Register() {
	const [state, action, isPending] = useActionState(register, null);
	return (
		<div className="auth-page">
			<div className="container w-1/2">
				<h1 className="title">Register</h1>
				<form action={action} autoComplete="off" className="space-y-4">
					<div>
						<label htmlFor="firstName">
							First Name<span className="mandatory">*</span>
						</label>
						<input
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
							type="text"
							name="email"
							defaultValue={state?.email ?? ''}
							autoComplete="off"
						/>
						{state?.errors?.email && (
							<p className="error">{state.errors.email}</p>
						)}
					</div>
					<div>
						<label htmlFor="password">
							Password<span className="mandatory">*</span>
						</label>
						<input type="password" name="password" autoComplete="off" />
						{state?.errors?.password && (
							<div className="error">
								<p>Password must:</p>
								<ul className="list-disc list-inside ml-4">
									{state.errors.password.map((error) => (
										<li key={error}>{error}</li>
									))}
								</ul>
							</div>
						)}
					</div>
					<div>
						<label htmlFor="confirmPassword">
							Confirm Password<span className="mandatory">*</span>
						</label>
						<input type="password" name="confirmPassword" />
						{state?.errors?.confirmPassword && (
							<p className="error">{state.errors.confirmPassword}</p>
						)}
					</div>
					<div className="flex items-end gap-4">
						<button disabled={isPending} className="btn-primary">
							Register
						</button>
						<Link href="/" className="text-link">
							or login here
						</Link>
					</div>
				</form>
			</div>
		</div>
	);
}
