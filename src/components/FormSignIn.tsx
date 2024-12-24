'use client';
import React from 'react';
import Link from 'next/link';
import { FormInputBox } from '@/components';
import { Form, Button } from '@/components/ui';
import { routes } from '@/utils/constants';
import { IForm } from '@/types/interfaces';

export default function FormSignIn({
	action,
	autoComplete,
	className,
	isPending = false,
	state,
}: IForm) {
	return (
		<Form action={action} autoComplete={autoComplete} className={className}>
			<FormInputBox
				id="email"
				name="email"
				labelText="Email"
				defaultValue={(state?.data?.email as string) ?? ''}
				errors={state?.errors?.email}
			/>
			<FormInputBox
				id="password"
				name="password"
				type="password"
				labelText="Password"
				errors={state?.errors?.password}
			/>
			<Link href={routes.RESET_PASSWORD} className="label-text">
				Forgot Password?
			</Link>
			<div className="flex items-end gap-4">
				<Button text="Sign In" disabled={isPending} />
				<Link href={routes.SIGNUP} className="text-link">
					or Sign Up here
				</Link>
			</div>
		</Form>
	);
}
