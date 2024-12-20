'use client';
import { useEffect, useState } from 'react';
import { getTicket } from '@/actions/tickets';
import Link from 'next/link';
import { useParams, usePathname } from 'next/navigation';
import { formatDate } from '@/utils/formatters';

interface ICategory {
	id?: number;
	title: string;
}

type Role = 'ADMIN' | 'USER';
type Status = 'Pending' | 'InProgress' | 'Resolved';

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
	assignedTo: number | null;
	categoryId: number;
	createdAt: Date;
	updatedAt: Date;
	createdByUser: IUser;
	assignedToUser: IUser | null;
	category: ICategory;
}

export default function Ticket() {
	const path = usePathname();
	const { id } = useParams<{ id: string }>();
	const [ticket, setTicket] = useState<ITicket | null>(null);

	useEffect(() => {
		if (id) {
			const fetchTicket = async () => {
				const fetchedTicket = await getTicket(parseInt(id));
				setTicket(fetchedTicket);
			};
			fetchTicket();
		}
	}, [id]);

	return (
		<div>
			<h1 className="title">Ticket {ticket?.title}</h1>
			<div className="mb-10">
				<Link href="/tickets" className="text-link">
					Back to all tickets
				</Link>
			</div>
			{ticket ? (
				<>
					<ul>
						<li className="flex">
							<b className="w-1/5 mr-6">Title:</b>
							{ticket.title}
						</li>
						<li className="flex">
							<b className="w-1/5 mr-6">Content:</b>
							{ticket.content}
						</li>
						<li className="flex">
							<b className="w-1/5 mr-6">Category:</b>
							{ticket.category.title}
						</li>
						<li className="flex">
							<b className="w-1/5 mr-6">Status:</b>
							{ticket.status}
						</li>
						<li className="flex">
							<b className="w-1/5 mr-6">CreateBy:</b>
							{ticket.createdByUser.firstName} {ticket.createdByUser.lastName}
						</li>
						<li className="flex">
							<b className="w-1/5 mr-6">AssignedTo:</b>
							{ticket.assignedToUser?.firstName}{' '}
							{ticket.assignedToUser?.lastName}
						</li>
						<li className="flex">
							<b className="w-1/5 mr-6">Created At:</b>
							{formatDate(ticket.createdAt)}
						</li>
						<li className="flex">
							<b className="w-1/5 mr-6">Updated At:</b>
							{formatDate(ticket.updatedAt)}
						</li>
					</ul>
					<div className="mt-16">
						<Link
							href={`${path}/edit`}
							className="inline-flex btn-primary mr-6"
						>
							Edit
						</Link>
					</div>
				</>
			) : (
				<p>Ticket is not found.</p>
			)}
		</div>
	);
}
