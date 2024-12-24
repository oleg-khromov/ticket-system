'use client';
import React from 'react';
import Link from 'next/link';
import { FormInputBox } from '@/components';
import { Form, Button } from '@/components/ui';
import { routes } from '@/utils/constants';
import { IForm } from '@/types/interfaces';

export default function FormSignUp({
	action,
	autoComplete,
	className,
	isPending = false,
	state,
}: IForm) {
	return (
		<Form action={action} autoComplete={autoComplete} className={className}>
			<FormInputBox
				id="firstName"
				name="firstName"
				labelText="First Name"
				defaultValue={(state?.data?.firstName as string) ?? ''}
				errors={state?.errors?.firstName}
				required={true}
			/>
			<FormInputBox
				id="lastName"
				name="lastName"
				labelText="Last Name"
				defaultValue={(state?.data?.lastName as string) ?? ''}
				errors={state?.errors?.lastName}
				required={true}
			/>
			<FormInputBox
				id="phoneNumber"
				name="phoneNumber"
				labelText="Phone Number"
				defaultValue={(state?.data?.phoneNumber as string) ?? ''}
				errors={state?.errors?.phoneNumber}
			/>
			<FormInputBox
				id="email"
				name="email"
				labelText="Email"
				defaultValue={(state?.data?.email as string) ?? ''}
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
		</Form>
	);
}
