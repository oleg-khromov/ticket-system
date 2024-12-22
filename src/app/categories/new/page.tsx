'use client';
import { useActionState, useEffect } from 'react';
import { actionAddCategory } from '@/actions/categories';
import toast from 'react-hot-toast';
import Link from 'next/link';
import { routes } from '@/utils/constants';
import { Button } from '@/components/ui';
import { FormInputBox } from '@/components/';

export default function AddCategory() {
	const [state, action, isPending] = useActionState(
		actionAddCategory,
		undefined,
	);

	useEffect(() => {
		if (state?.message) toast.success(state.message);
		if (state?.errors?.title) toast.error(state.errors.title);
	}, [state]);
	return (
		<div>
			<h1 className="title">Add category</h1>
			<div className="mb-10">
				<Link href={routes.CATEGORIES} className="text-link">
					Back to all categories
				</Link>
			</div>
			{state?.message ? (
				<p className="text-center mb-6">{state.message}</p>
			) : (
				''
			)}
			<div className="container w-3/4">
				<form action={action} autoComplete="off" className="space-y-4">
					<FormInputBox
						id="title"
						name="title"
						labelText="Title"
						defaultValue={state?.data?.title ?? ''}
						errors={state?.errors?.title}
					/>
					{/* <div>
						<label htmlFor="title">Title</label>
						<input
							id="title"
							type="text"
							name="title"
							autoComplete="off"
							defaultValue={state?.title ?? ''}
						/>
						{state?.errors?.title && (
							<p className="error">{state.errors.title}</p>
						)}
					</div> */}
					<div className="flex items-end gap-4">
						<Button text="Add category" disabled={isPending} />
					</div>
				</form>
			</div>
		</div>
	);
}
