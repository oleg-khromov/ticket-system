'use client';
import { useActionState } from 'react';
import { actionSignup } from '@/actions/auth';
import Link from 'next/link';
import { routes } from '@/utils/constants';
import { Button } from '@/components/ui';
import { FormInputBox } from '@/components/';

export default function SignUp() {
	const [state, action, isPending] = useActionState(actionSignup, undefined);
	return (
		<div className="auth-page">
			<div className="container w-1/2">
				<h1 className="title">Sign Up</h1>
				<form action={action} autoComplete="off" className="space-y-4">
					<FormInputBox
						id="firstName"
						name="firstName"
						labelText="First Name"
						defaultValue={state?.data?.firstName ?? ''}
						errors={state?.errors?.firstName}
						required={true}
					/>
					<FormInputBox
						id="lastName"
						name="lastName"
						labelText="Last Name"
						defaultValue={state?.data?.lastName ?? ''}
						errors={state?.errors?.lastName}
						required={true}
					/>
					<FormInputBox
						id="phoneNumber"
						name="phoneNumber"
						labelText="Phone Number"
						defaultValue={state?.data?.phoneNumber ?? ''}
						errors={state?.errors?.phoneNumber}
					/>
					<FormInputBox
						id="email"
						name="email"
						labelText="Email"
						defaultValue={state?.data?.email ?? ''}
						errors={state?.errors?.email}
						required={true}
					/>
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
						<Button text="Sign Up" disabled={isPending} />
						<Link href={routes.SIGNIN} className="text-link">
							or Sign In here
						</Link>
					</div>
				</form>
			</div>
		</div>
	);
}
