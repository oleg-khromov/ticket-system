'use client';
import { useActionState } from 'react';
import { actionAddCategory } from '@/actions/categories';
import { FormNewCategory } from '@/components';
import { Heading } from '@/components/ui';
import { useFormToast } from '@/hooks';

export default function AddCategory() {
	const [state, action, isPending] = useActionState(
		actionAddCategory,
		undefined,
	);
	useFormToast(state);
	return (
		<div>
			<Heading content="Add category" className="mb-6" />
			<div className="container w-3/4">
				<FormNewCategory action={action} isPending={isPending} state={state} />
			</div>
		</div>
	);
}
