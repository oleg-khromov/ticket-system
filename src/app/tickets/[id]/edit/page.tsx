'use client';
import { useEffect, useState, useActionState } from 'react';
import { actionGetCategories } from '@/actions/categories';
import { actionGetTicket, actionUpdateTicket } from '@/actions/tickets';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { routes } from '@/utils/constants';
import { Heading } from '@/components/ui';
import { FormEditTicket } from '@/components/';
import { ICategory, ITicket } from '@/types/interfaces';
import { useFormToast } from '@/hooks';

export default function EditTicket() {
	const { id } = useParams<{ id: string }>();

	const [state, action, isPending] = useActionState(
		actionUpdateTicket,
		undefined,
	);
	const [ticket, setTicket] = useState<ITicket | null>(null);
	const [categories, setCategories] = useState<ICategory[]>([]);
	useEffect(() => {
		if (id) {
			const fetchTicket = async () => {
				const fetchedTicket = await actionGetTicket(parseInt(id));
				setTicket(fetchedTicket);
			};
			fetchTicket();
			const fetchCategories = async () => {
				const fetchedCategories = await actionGetCategories();
				setCategories(fetchedCategories);
			};
			fetchCategories();
		}
	}, [id, isPending]);
	useFormToast(state);
	return (
		<div>
			<Heading content={`Edit ticket ${ticket?.title}`} />
			<div className="mb-10">
				<Link href={routes.TICKETS} className="text-link">
					Back to all tickets
				</Link>
			</div>
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
