'use client';
import { actionGetTickets } from '@/actions/tickets';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { routes } from '@/utils/constants';
import { TableTickets } from '@/components';
import { Heading } from '@/components/ui';
import { useData } from '@/hooks';

export default function Tickets() {
	const path = usePathname();
	const { data: tickets } = useData(actionGetTickets, []);
	return (
		<div>
			<div className="flex justify-between items-center mb-12">
				<Heading content="Tickets" />
				<Link href={`${path}${routes.NEW}`} className="btn-primary">
					Add ticket
				</Link>
			</div>
			{tickets && tickets.length ? (
				<TableTickets tickets={tickets} />
			) : (
				<p className="text-center mb-6">Add your first ticket.</p>
			)}
		</div>
	);
}
