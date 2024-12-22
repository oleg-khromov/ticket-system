'use client';
import { useActionState, useEffect, useState } from 'react';
import { actionAddTicket } from '@/actions/tickets';
import { actionGetCategories } from '@/actions/categories';
import toast from 'react-hot-toast';
import Link from 'next/link';
import { routes } from '@/utils/constants';
import { Button } from '@/components/ui';
import { FormInputBox, FormTextareaBox, FormSelectBox } from '@/components/';
import { ICategory } from '@/types/interfaces';

export default function AddTicket() {
	const [state, action, isPending] = useActionState(actionAddTicket, undefined);
	const [categories, setCategories] = useState<ICategory[]>([]);
	useEffect(() => {
		const fetchCategories = async () => {
			const fetchedCategories = await actionGetCategories();
			setCategories(fetchedCategories);
		};
		fetchCategories();
	}, []);
	const [selectedCategory, setSelectedCategory] = useState(1);

	useEffect(() => {
		if (state?.message) toast.success(state.message);
		if (state?.errors?.title) toast.error(state.errors.title);
	}, [state]);
	return (
		<div>
			<h1 className="title">Add ticket</h1>
			<div className="mb-10">
				<Link href={routes.TICKETS} className="text-link">
					Back to all tickets
				</Link>
			</div>
			{state?.message ? (
				<p className="text-center mb-6">{state.message}</p>
			) : (
				''
			)}
			<div className="container w-3/4">
				<form action={action} autoComplete="off" className="space-y-4">
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
				</form>
			</div>
		</div>
	);
}
