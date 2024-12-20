'use client';
import { useEffect, useState, useActionState } from 'react';
import { getCategory, updateCategory } from '@/actions/categories';
import Link from 'next/link';
import { useParams } from 'next/navigation';

interface ICategory {
	id: number;
	title: string;
	createdAt: Date;
	updatedAt: Date;
}

export default function EditCategory() {
	const { id } = useParams<{ id: string }>();
	const [category, setCategory] = useState<ICategory | null>(null);
	const [state, action, isPending] = useActionState(updateCategory, undefined);

	useEffect(() => {
		if (id) {
			const fetchCategory = async () => {
				const fetchedCategory = await getCategory(parseInt(id));
				setCategory(fetchedCategory);
			};
			fetchCategory();
		}
	}, [id, isPending]);
	return (
		<div>
			<h1 className="title">Edit category {category?.title}</h1>
			<div className="mb-10">
				<Link href="/categories" className="text-link">
					Back to all categories
				</Link>
			</div>
			{category ? (
				<div className="container w-3/4">
					<form action={action} autoComplete="off" className="space-y-4">
						<input type="hidden" name="id" value={id} />
						<input type="hidden" name="currentTitle" value={category.title} />
						<div>
							<label htmlFor="title">Title</label>
							<input
								id="title"
								type="text"
								name="title"
								autoComplete="off"
								defaultValue={(state?.title || category.title) ?? ''}
							/>
							{state?.errors?.title && (
								<p className="error">{state.errors.title}</p>
							)}
						</div>
						<div className="flex items-end gap-4">
							<button disabled={isPending} className="btn-primary">
								Edit category
							</button>
						</div>
					</form>
				</div>
			) : (
				''
			)}
		</div>
	);
}
