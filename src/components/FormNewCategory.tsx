'use client';
import React from 'react';
import { FormInputBox } from '@/components';
import { Form, Button } from '@/components/ui';
import { IForm } from '@/types/interfaces';

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
			<div className="flex items-end gap-4">
				<Button text="Add category" disabled={isPending} />
			</div>
		</Form>
	);
}
