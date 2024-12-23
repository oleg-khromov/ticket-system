'use client';
import { useEffect, useState, useActionState } from 'react';
import { actionGetCategory, actionUpdateCategory } from '@/actions/categories';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { routes } from '@/utils/constants';
import { Heading } from '@/components/ui';
import { FormEditCategory } from '@/components/';
import { ICategory } from '@/types/interfaces';
import { useFormToast } from '@/hooks';

export default function EditCategory() {
	const { id } = useParams<{ id: string }>();
	const [category, setCategory] = useState<ICategory | null>(null);
	const [state, action, isPending] = useActionState(
		actionUpdateCategory,
		undefined,
	);
	useFormToast(state);
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
			<Heading content={`Edit category ${category?.title}`} />
			<div className="mb-10">
				<Link href={routes.CATEGORIES} className="text-link">
					Back to all categories
				</Link>
			</div>
			{category ? (
				<div className="container w-3/4">
					<FormEditCategory
						action={action}
						isPending={isPending}
						state={state}
						category={category}
						id={id}
					/>
				</div>
			) : (
				''
			)}
		</div>
	);
}
