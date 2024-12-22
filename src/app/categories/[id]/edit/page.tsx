'use client';
import { useEffect, useState, useActionState } from 'react';
import { actionGetCategory, actionUpdateCategory } from '@/actions/categories';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { routes } from '@/utils/constants';
import { Button } from '@/components/ui';
import { FormInputBox } from '@/components/';
import { ICategory } from '@/types/interfaces';

export default function EditCategory() {
	const { id } = useParams<{ id: string }>();
	const [category, setCategory] = useState<ICategory | null>(null);
	const [state, action, isPending] = useActionState(
		actionUpdateCategory,
		undefined,
	);

	useEffect(() => {
		if (id) {
			const fetchCategory = async () => {
				const fetchedCategory = await actionGetCategory(parseInt(id));
				setCategory(fetchedCategory);
			};
			fetchCategory();
		}
	}, [id, isPending]);
	return (
		<div>
			<h1 className="title">Edit category {category?.title}</h1>
			<div className="mb-10">
				<Link href={routes.CATEGORIES} className="text-link">
					Back to all categories
				</Link>
			</div>
			{category ? (
				<div className="container w-3/4">
					<form action={action} autoComplete="off" className="space-y-4">
						<input type="hidden" name="id" value={id} />
						<input type="hidden" name="currentTitle" value={category.title} />
						<FormInputBox
							id="title"
							name="title"
							labelText="Title"
							defaultValue={(state?.data?.title || category.title) ?? ''}
							errors={state?.errors?.title}
						/>
						<div className="flex items-end gap-4">
							<Button text="Edit category" disabled={isPending} />
						</div>
					</form>
				</div>
			) : (
				''
			)}
		</div>
	);
}
