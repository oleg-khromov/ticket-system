'use client';
import { useEffect, useState } from 'react';
import { actionGetTickets } from '@/actions/tickets';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { routes } from '@/utils/constants';
import { ITicketWithFullInformation } from '@/types/interfaces';
import { Heading } from '@/components/ui';
import { TableTickets } from '@/components';

export default function Tickets() {
	const path = usePathname();
	const [tickets, setTickets] = useState<ITicketWithFullInformation[]>([]);
	useEffect(() => {
		const fetchTickets = async () => {
			const fetchedTickets = await actionGetTickets();
			setTickets(fetchedTickets);
		};
		fetchTickets();
	}, []);
	return (
		<div>
			<Heading content="Tickets" />
			{tickets.length ? (
				<TableTickets tickets={tickets} />
			) : (
				<p className="text-center mb-6">Add your first ticket.</p>
			)}
			<p className="text-center">
				<Link href={`${path}${routes.NEW}`} className="btn-primary">
					Add ticket
				</Link>
			</p>
		</div>
	);
}
