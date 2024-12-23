'use client';
import { useActionState, useEffect, useState } from 'react';
import { actionAddTicket } from '@/actions/tickets';
import { actionGetCategories } from '@/actions/categories';
import Link from 'next/link';
import { routes } from '@/utils/constants';
import { Heading } from '@/components/ui';
import { FormNewTicket } from '@/components/';
import { ICategory } from '@/types/interfaces';
import { useFormToast } from '@/hooks';

export default function AddTicket() {
	const [state, action, isPending] = useActionState(actionAddTicket, undefined);
	const [categories, setCategories] = useState<ICategory[]>([]);
	useEffect(() => {
		const fetchCategories = async () => {
			const fetchedCategories = await actionGetCategories();
			setCategories(fetchedCategories);
		};
		fetchCategories();
	}, []);
	useFormToast(state);
	return (
		<div>
			<Heading content="Add ticket" />
			<div className="mb-10">
				<Link href={routes.TICKETS} className="text-link">
					Back to all tickets
				</Link>
			</div>
			{state?.message ? (
				<p className="text-center mb-6">{state.message}</p>
			) : (
				''
			)}
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
