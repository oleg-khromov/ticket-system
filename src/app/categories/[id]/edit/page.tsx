'use client';
import { useActionState, useCallback } from 'react';
import { actionGetCategory, actionUpdateCategory } from '@/actions/categories';
import { useParams } from 'next/navigation';
import { FormEditCategory } from '@/components';
import { Heading } from '@/components/ui';
import { useFormToast, useData } from '@/hooks';

export default function EditCategory() {
	const { id } = useParams<{ id: string }>();

	const [state, action, isPending] = useActionState(
		actionUpdateCategory,
		undefined,
	);

	const { data: category } = useData(
		useCallback(() => actionGetCategory(parseInt(id)), [id]),
		[id, isPending],
	);

	useFormToast(state);
	return (
		<div>
			<Heading content={`Edit category: ${category?.title}`} className="mb-6" />
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
