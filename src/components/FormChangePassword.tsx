'use client';
import React from 'react';
import Link from 'next/link';
import { FormInputBox } from '@/components';
import { Form, Button } from '@/components/ui';
import { routes } from '@/utils/constants';
import { IForm } from '@/types/interfaces';

interface IFormChangePassword extends IForm {
	token: string;
}

export default function FormChangePassword({
	action,
	autoComplete,
	className,
	isPending = false,
	state,
	token,
}: IFormChangePassword) {
	return (
		<Form action={action} autoComplete={autoComplete} className={className}>
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
		</Form>
	);
}
