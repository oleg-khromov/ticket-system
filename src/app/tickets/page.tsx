'use client';
import { useEffect, useState } from 'react';
import { actionGetTickets } from '@/actions/tickets';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { formatDate } from '@/utils/formatters';
import { routes } from '@/utils/constants';
import { ITicketWithFullInformation } from '@/types/interfaces';

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
			<h1 className="title">Tickets</h1>
			{tickets.length ? (
				<table>
					<thead>
						<tr>
							<th scope="col">ID</th>
							<th scope="col">Title</th>
							<th scope="col">Category</th>
							<th scope="col">Status</th>
							<th scope="col">CreatedBy</th>
							<th scope="col">CreatedAt</th>
							<th scope="col">UpdatedAt</th>
							<th scope="col">AssignedTo</th>
							<th scope="col">
								<span>&nbsp;</span>
							</th>
						</tr>
					</thead>
					<tbody>
						{tickets.map(
							({
								id,
								title,
								category,
								status,
								createdByUser,
								createdAt,
								updatedAt,
								assignedToUser,
							}) => {
								return (
									<tr key={id}>
										<td>{id}</td>
										<td>
											<Link href={`${path}/${id}`} className="text-link">
												{title}
											</Link>
										</td>
										<td>{category.title}</td>
										<td>{status}</td>
										<td>
											{createdByUser.firstName} {createdByUser.lastName}
										</td>
										<td>{formatDate(createdAt as Date)}</td>
										<td>{formatDate(updatedAt as Date)}</td>
										<td>
											{assignedToUser?.firstName} {assignedToUser?.lastName}
										</td>
										<td>
											<Link
												href={`${path}/${id}${routes.EDIT}`}
												className="text-link"
											>
												<b>Edit</b>
											</Link>
										</td>
									</tr>
								);
							},
						)}
					</tbody>
				</table>
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
