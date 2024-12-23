'use client';
import React from 'react';
import { FormInputBox } from '@/components';
import { Form, Button } from '@/components/ui';
import { IForm, ICategory } from '@/types/interfaces';

interface IFormEditCategory extends IForm {
	category: ICategory | null;
	id: string;
}

export default function FormEditCategory({
	action,
	autoComplete,
	className,
	isPending = false,
	state,
	category,
	id,
}: IFormEditCategory) {
	return (
		<Form action={action} autoComplete={autoComplete} className={className}>
			<input type="hidden" name="id" value={id} />
			<input type="hidden" name="currentTitle" value={category?.title} />
			<FormInputBox
				id="title"
				name="title"
				labelText="Title"
				defaultValue={(state?.data?.title || category?.title) ?? ''}
				errors={state?.errors?.title}
			/>
			<div className="flex items-end gap-4">
				<Button text="Edit category" disabled={isPending} />
			</div>
		</Form>
	);
}
