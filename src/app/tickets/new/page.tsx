'use client';
import { useActionState, useEffect, useState } from 'react';
import { addTicket } from '@/actions/tickets';
import { getCategories } from '@/actions/categories';
import toast from 'react-hot-toast';
import Link from 'next/link';

interface ICategory {
	id: number;
	title: string;
}

export default function AddTicket() {
	const [state, action, isPending] = useActionState(addTicket, undefined);
	const [categories, setCategories] = useState<ICategory[]>([]);
	useEffect(() => {
		const fetchCategories = async () => {
			const fetchedCategories = await getCategories();
			setCategories(fetchedCategories);
		};
		fetchCategories();
	}, []);
	const [selectedCategory, setSelectedCategory] = useState('');

	useEffect(() => {
		if (state?.message) toast.success(state.message);
		if (state?.errors?.title) toast.error(state.errors.title);
	}, [state]);
	return (
		<div>
			<h1 className="title">Add ticket</h1>
			<div className="mb-10">
				<Link href="/tickets" className="text-link">
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
					<div>
						<label htmlFor="categoryId">Category</label>
						<select
							id="categoryId"
							name="categoryId"
							value={selectedCategory}
							onChange={(e) => setSelectedCategory(e.target.value)}
						>
							{categories?.map(({ id, title }) => (
								<option key={id} value={id}>
									{title}
								</option>
							))}
						</select>
						{state?.errors?.category && (
							<p className="error">{state.errors.category}</p>
						)}
					</div>
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
					<div>
						<label htmlFor="content">Content</label>
						<textarea
							id="content"
							name="content"
							autoComplete="off"
							defaultValue={state?.content ?? ''}
						/>
						{state?.errors?.content && (
							<p className="error">{state.errors.content}</p>
						)}
					</div>
					<div className="flex items-end gap-4">
						<button disabled={isPending} className="btn-primary">
							Add ticket
						</button>
					</div>
				</form>
			</div>
		</div>
	);
}
