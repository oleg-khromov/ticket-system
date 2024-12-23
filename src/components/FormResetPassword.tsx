'use client';
import React from 'react';
import Link from 'next/link';
import { FormInputBox } from '@/components';
import { Form, Button } from '@/components/ui';
import { routes } from '@/utils/constants';
import { IForm } from '@/types/interfaces';

export default function FormChangePassword({
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
				defaultValue={state?.data?.email ?? ''}
				errors={state?.errors?.email}
			/>
			<div className="flex items-end gap-4">
				<Button text="Reset password" disabled={isPending} />
				<Link href={routes.SIGNIN} className="text-link">
					or back to Sign In
				</Link>
			</div>
		</Form>
	);
}
