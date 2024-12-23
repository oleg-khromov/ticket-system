'use client';
import React from 'react';
import { useState } from 'react';
import { FormInputBox, FormSelectBox, FormTextareaBox } from '@/components';
import { Form, Button } from '@/components/ui';
import { IForm, ICategory } from '@/types/interfaces';

interface IFormNewTicket extends IForm {
	categories: ICategory[];
}

export default function FormNewTicket({
	action,
	autoComplete,
	className,
	isPending = false,
	state,
	categories,
}: IFormNewTicket) {
	const [selectedCategory, setSelectedCategory] = useState(1);
	return (
		<Form action={action} autoComplete={autoComplete} className={className}>
			<FormSelectBox
				id="categoryId"
				name="categoryId"
				labelText="Category"
				value={selectedCategory}
				options={categories}
				onChange={(e) => setSelectedCategory(parseInt(e.target.value))}
				errors={state?.errors?.category}
			/>
			<FormInputBox
				id="title"
				name="title"
				labelText="Title"
				defaultValue={state?.data?.title ?? ''}
				errors={state?.errors?.title}
			/>
			<FormTextareaBox
				id="content"
				name="content"
				labelText="Content"
				defaultValue={state?.data?.content ?? ''}
				errors={state?.errors?.content}
			/>
			<div className="flex items-end gap-4">
				<Button text="Add ticket" disabled={isPending} />
			</div>
		</Form>
	);
}
