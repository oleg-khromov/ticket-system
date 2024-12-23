'use client';
import React from 'react';
import { FormInputBox } from '@/components';
import { Form, Button } from '@/components/ui';
import { IForm } from '@/types/interfaces';
import Link from 'next/link';
import { routes } from '@/utils/constants';

export default function FormNewCategory({
	action,
	autoComplete,
	className,
	isPending = false,
	state,
}: IForm) {
	return (
		<Form action={action} autoComplete={autoComplete} className={className}>
			<FormInputBox
				id="title"
				name="title"
				labelText="Title"
				defaultValue={state?.data?.title ?? ''}
				errors={state?.errors?.title}
			/>
			<div className="flex items-end gap-4 justify-between">
				<Link href={routes.CATEGORIES} className="btn-secondary">
					Back
				</Link>
				<Button text="Add" disabled={isPending} />
			</div>
		</Form>
	);
}
