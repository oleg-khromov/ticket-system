'use client';
import { useEffect, useState } from 'react';
import {
	actionGetTicket,
	actionUpdateTicketStatus,
	actionUpdateTicketAssignedTo,
} from '@/actions/tickets';
import { actionGetUsersByRole } from '@/actions/users';
import Link from 'next/link';
import { useParams, usePathname } from 'next/navigation';
import { formatDate } from '@/utils/formatters';
import toast from 'react-hot-toast';
import { routes } from '@/utils/constants';
import {
	IUser,
	ITicketWithFullInformation,
	StatusType,
	USER_ROLE,
	TICKET_STATUS,
} from '@/types/interfaces';

const ticketStatuses = Object.values(TICKET_STATUS);

export default function Ticket() {
	const path = usePathname();
	const { id } = useParams<{ id: string }>();
	const [ticket, setTicket] = useState<ITicketWithFullInformation | null>(null);
	const [selectedStatus, setSelectedStatus] = useState(ticket?.status);
	const [selectedAssignedTo, setSelectedAssignedTo] = useState(0);
	const [admins, setAdmins] = useState<IUser[]>([]);

	useEffect(() => {
		if (id) {
			const fetchTicket = async () => {
				const fetchedTicket = await actionGetTicket(parseInt(id));
				console.log('fetchedTicket', fetchedTicket);
				setTicket(fetchedTicket);
			};
			fetchTicket();
			const fetchUsersAdmin = async () => {
				const fetchedUserAdmins = await actionGetUsersByRole(USER_ROLE.ADMIN);
				setAdmins(fetchedUserAdmins);
			};
			fetchUsersAdmin();
		}
	}, [id]);

	useEffect(() => {
		if (selectedStatus) {
			const updateTicket = async () => {
				const updatedTicket = await actionUpdateTicketStatus(
					id,
					selectedStatus as StatusType,
				);
				// setTicket({
				// 	...ticket,
				// 	...(updatedTicket?.data as ITicketWithFullInformation),
				// });
				console.log(/*updatedTicket.data,*/ selectedStatus, ticket?.status);
				if (updatedTicket?.message) toast.success(updatedTicket.message);
			};
			updateTicket();
		}
	}, [selectedStatus]);

	useEffect(() => {
		if (selectedAssignedTo) {
			const updateTicket = async () => {
				const updatedTicket = await actionUpdateTicketAssignedTo(
					id,
					selectedAssignedTo,
				);
				// setTicket({
				// 	...ticket,
				// 	...(updatedTicket?.data as ITicketWithFullInformation),
				// });
				console.log(
					// updatedTicket.data,
					selectedAssignedTo,
					ticket?.assignedTo,
				);
				if (updatedTicket?.message) toast.success(updatedTicket.message);
			};
			updateTicket();
		}
	}, [selectedAssignedTo]);

	return (
		<div>
			<h1 className="title">Ticket {ticket?.title}</h1>
			<div className="mb-10">
				<Link href={routes.TICKETS} className="text-link">
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
							{ticket?.category?.title}
						</li>
						<li className="flex">
							<b className="w-1/5 mr-6">Status:</b>
							{ticket.status}

							<select
								id="status"
								name="status"
								value={selectedStatus || ticket.status}
								onChange={(e) =>
									setSelectedStatus(e.target.value as StatusType)
								}
							>
								{ticketStatuses?.map((status) => (
									<option key={status} value={status}>
										{status}
									</option>
								))}
							</select>
						</li>
						<li className="flex">
							<b className="w-1/5 mr-6">CreateBy:</b>
							{ticket.createdByUser.firstName} {ticket.createdByUser.lastName}
						</li>
						<li className="flex">
							<b className="w-1/5 mr-6">AssignedTo:</b>
							{ticket.assignedToUser?.firstName}{' '}
							{ticket.assignedToUser?.lastName}
							<select
								id="assignedTo"
								name="assignedTo"
								value={selectedAssignedTo || ticket.assignedTo || 0}
								onChange={(e) =>
									setSelectedAssignedTo(parseInt(e.target.value))
								}
							>
								<option key={0} value={0} className="text-slate-400">
									Select
								</option>
								{/* {!selectedAssignedTo && !ticket.assignedTo ? (
									<option key={0} value={0}></option>
								) : (
									''
								)} */}
								{admins?.map(({ id, firstName, lastName }) => (
									<option key={id} value={id}>
										{firstName} {lastName}
									</option>
								))}
							</select>
						</li>
						<li className="flex">
							<b className="w-1/5 mr-6">Created At:</b>
							{formatDate(ticket.createdAt as Date)}
						</li>
						<li className="flex">
							<b className="w-1/5 mr-6">Updated At:</b>
							{formatDate(ticket.updatedAt as Date)}
						</li>
					</ul>
					<div className="mt-16">
						<Link
							href={`${path}${routes.EDIT}`}
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
