'use client';
import { useActionState, useEffect } from 'react';
import { addCategory } from '@/actions/categories';
import toast from 'react-hot-toast';
import Link from 'next/link';

export default function AddCategory() {
	const [state, action, isPending] = useActionState(addCategory, undefined);

	useEffect(() => {
		if (state?.message) toast.success(state.message);
		if (state?.errors?.title) toast.error(state.errors.title);
	}, [state]);
	return (
		<div>
			<h1 className="title">Add category</h1>
			{state?.message ? (
				<p className="text-center mb-6">{state.message}</p>
			) : (
				''
			)}
			<div className="container w-3/4">
				<form action={action} autoComplete="off" className="space-y-4">
					<div>
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
					</div>
					<div className="flex items-end gap-4">
						<button disabled={isPending} className="btn-primary">
							Add category
						</button>
						<Link href="/categories" className="text-link">
							back to Categories
						</Link>
					</div>
				</form>
			</div>
		</div>
	);
}