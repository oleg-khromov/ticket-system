'use client';
import { useActionState } from 'react';
import { actionAddCategory } from '@/actions/categories';
import Link from 'next/link';
import { routes } from '@/utils/constants';
import { Heading } from '@/components/ui';
import { FormNewCategory } from '@/components/';
import { useFormToast } from '@/hooks';

export default function AddCategory() {
	const [state, action, isPending] = useActionState(
		actionAddCategory,
		undefined,
	);
	useFormToast(state);
	return (
		<div>
			<Heading content="Add category" />
			<div className="mb-10">
				<Link href={routes.CATEGORIES} className="text-link">
					Back to all categories
				</Link>
			</div>
			<div className="container w-3/4">
				<FormNewCategory action={action} isPending={isPending} state={state} />
			</div>
		</div>
	);
}
