'use client';
import React from 'react';
import { useEffect, useState } from 'react';
import { FormInputBox, FormSelectBox, FormTextareaBox } from '@/components';
import { Form, Button } from '@/components/ui';
import { IForm, ITicket, ICategory } from '@/types/interfaces';
import Link from 'next/link';
import { routes } from '@/utils/constants';

interface IFormEditTicket extends IForm {
	id: string;
	categories: ICategory[] | null;
	ticket: ITicket | null;
}

export default function FormEditTicket({
	action,
	autoComplete,
	className,
	isPending = false,
	state,
	id,
	categories,
	ticket,
}: IFormEditTicket) {
	const [selectedCategory, setSelectedCategory] = useState(1);

	useEffect(() => {
		setSelectedCategory(ticket?.categoryId || 1);
	}, [ticket]);

	return (
		<Form action={action} autoComplete={autoComplete} className={className}>
			<input type="hidden" name="id" value={id} />
			<FormSelectBox
				id="categoryId"
				name="categoryId"
				labelText="Category"
				value={selectedCategory || ticket?.categoryId}
				options={categories}
				onChange={(e) => setSelectedCategory(parseInt(e.target.value))}
				errors={state?.errors?.category}
			/>
			<FormInputBox
				id="title"
				name="title"
				labelText="Title"
				defaultValue={((state?.data?.title || ticket?.title) as string) ?? ''}
				errors={state?.errors?.title}
			/>
			<FormTextareaBox
				id="content"
				name="content"
				labelText="Content"
				defaultValue={
					((state?.data?.content || ticket?.content) as string) ?? ''
				}
				errors={state?.errors?.content}
			/>
			<div className="flex items-end gap-4 justify-between">
				<Link href={routes.TICKETS} className="btn-secondary">
					Back
				</Link>
				<Button text="Save" disabled={isPending} />
			</div>
		</Form>
	);
}
