'use client';
import React from 'react';
import { useState } from 'react';
import { FormInputBox, FormSelectBox, FormTextareaBox } from '@/components';
import { Form, Button } from '@/components/ui';
import { IForm, ICategory } from '@/types/interfaces';
import Link from 'next/link';
import { routes } from '@/utils/constants';

interface IFormNewTicket extends IForm {
	categories: ICategory[] | null;
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
				defaultValue={(state?.data?.title as string) ?? ''}
				errors={state?.errors?.title}
			/>
			<FormTextareaBox
				id="content"
				name="content"
				labelText="Content"
				defaultValue={(state?.data?.content as string) ?? ''}
				errors={state?.errors?.content}
			/>
			<div className="flex items-end gap-4 justify-between">
				<Link href={routes.TICKETS} className="btn-secondary">
					Back
				</Link>
				<Button text="Add" disabled={isPending} />
			</div>
		</Form>
	);
}
