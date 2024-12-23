'use client';
import { useActionState } from 'react';
import { actionAddTicket } from '@/actions/tickets';
import { actionGetCategories } from '@/actions/categories';

import { FormNewTicket } from '@/components';
import { Heading } from '@/components/ui';
import { useFormToast, useData } from '@/hooks';

export default function AddTicket() {
	const [state, action, isPending] = useActionState(actionAddTicket, undefined);
	const { data: categories } = useData(actionGetCategories, []);
	useFormToast(state);
	return (
		<div>
			<Heading content="Add ticket" className="mb-6" />
			<div className="container w-3/4">
				<FormNewTicket
					action={action}
					isPending={isPending}
					state={state}
					categories={categories}
				/>
			</div>
		</div>
	);
}
