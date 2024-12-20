'use client';
import { useEffect, useState } from 'react';
import { getTickets } from '@/actions/tickets';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { formatDate } from '@/utils/formatters';

// enum Status {
// 	Pending,
// 	InProgress,
// 	Resolved,
// }

type Role = 'ADMIN' | 'USER';
type Status = 'Pending' | 'InProgress' | 'Resolved';

interface ICategory {
	id?: number;
	title?: string;
}

interface IUser {
	id?: number;
	firstName?: string;
	lastName?: string;
	email?: string;
	role?: Role;
	phoneNumber?: string | null;
	createdAt?: Date;
	updatedAt?: Date;
	password?: string;
}

interface ITicket {
	id: number;
	title: string;
	content: string;
	status: Status;
	createdBy: number;
	assignedTo: number;
	categoryId: number;
	createdAt: Date;
	updatedAt: Date;
	createdByUser: IUser;
	assignedToUser: IUser;
	category: ICategory;
}

export default function Tickets() {
	const path = usePathname();
	const [tickets, setTickets] = useState<ITicket[]>([]);
	useEffect(() => {
		const fetchTickets = async () => {
			const fetchedTickets = await getTickets();
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
										<td>
											<Link href={`${path}/${id}`} className="text-link">
												{id}
											</Link>
										</td>
										<td>{title}</td>
										<td>{category.title}</td>
										<td>{status}</td>
										<td>
											{createdByUser.firstName} {createdByUser.lastName}
										</td>
										<td>{formatDate(createdAt)}</td>
										<td>{formatDate(updatedAt)}</td>
										<td>
											{assignedToUser.firstName} {assignedToUser.lastName}
										</td>
										<td>
											<Link href={`${path}/${id}/edit`} className="text-link">
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
				<Link href={`${path}/new`} className="btn-primary">
					Add ticket
				</Link>
			</p>
		</div>
	);
}
