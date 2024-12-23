'use client';
import { useCallback, useActionState } from 'react';
import { actionGetCategories } from '@/actions/categories';
import { actionGetTicket, actionUpdateTicket } from '@/actions/tickets';
import { useParams } from 'next/navigation';
import { FormEditTicket } from '@/components';
import { Heading } from '@/components/ui';
import { useFormToast, useData } from '@/hooks';

export default function EditTicket() {
	const { id } = useParams<{ id: string }>();

	const [state, action, isPending] = useActionState(
		actionUpdateTicket,
		undefined,
	);

	const { data: ticket } = useData(
		useCallback(() => actionGetTicket(parseInt(id)), [id]),
		[id, isPending],
	);

	const { data: categories } = useData(actionGetCategories, [id]);

	useFormToast(state);
	return (
		<div>
			<Heading content={`Edit ticket: ${ticket?.title}`} className="mb-6" />
			{ticket ? (
				<div className="container w-3/4">
					<FormEditTicket
						action={action}
						isPending={isPending}
						state={state}
						id={id}
						categories={categories}
						ticket={ticket}
					/>
				</div>
			) : (
				''
			)}
		</div>
	);
}
