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
	ITicketWithFullInformation,
	StatusType,
	USER_ROLE,
	TICKET_STATUS,
} from '@/types/interfaces';
import { Select, Heading } from '@/components/ui';

const selectTicketStatusOptions = Object.values(TICKET_STATUS).map(
	(status) => ({
		id: status,
		title: status,
	}),
);

export default function Ticket() {
	const path = usePathname();
	const { id } = useParams<{ id: string }>();
	const [ticket, setTicket] = useState<ITicketWithFullInformation | null>(null);
	const [selectedStatus, setSelectedStatus] = useState(ticket?.status);
	const [selectedAssignedTo, setSelectedAssignedTo] = useState(0);
	const [selectAssignedToOptions, setSelectAssignedToOptions] = useState([
		{
			id: -1,
			title: 'Select',
		},
	]);

	useEffect(() => {
		if (id) {
			const fetchTicket = async () => {
				const fetchedTicket = await actionGetTicket(parseInt(id));
				setTicket(fetchedTicket);
			};
			fetchTicket();
			const fetchUsersAdmin = async () => {
				const fetchedUserAdmins = await actionGetUsersByRole(USER_ROLE.ADMIN);
				const users = [...selectAssignedToOptions];
				fetchedUserAdmins.forEach(({ id, firstName, lastName }) =>
					users.push({
						id,
						title: `${firstName} ${lastName}`,
					}),
				);
				setSelectAssignedToOptions(users);
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
				if (updatedTicket?.message) toast.success(updatedTicket.message);
			};
			updateTicket();
		}
	}, [selectedAssignedTo]);

	return (
		<div>
			<Heading content={`Ticket ${ticket?.title}`} />
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
							<Select
								id="status"
								name="status"
								value={selectedStatus || ticket.status}
								options={selectTicketStatusOptions}
								onChange={(e) =>
									setSelectedStatus(e.target.value as StatusType)
								}
							/>
						</li>
						<li className="flex">
							<b className="w-1/5 mr-6">CreateBy:</b>
							{ticket.createdByUser.firstName} {ticket.createdByUser.lastName}
						</li>
						<li className="flex">
							<b className="w-1/5 mr-6">AssignedTo:</b>
							{ticket.assignedToUser?.firstName}{' '}
							{ticket.assignedToUser?.lastName}
							<Select
								id="assignedTo"
								name="assignedTo"
								value={selectedAssignedTo || ticket.assignedTo || 0}
								options={selectAssignedToOptions}
								onChange={(e) =>
									setSelectedAssignedTo(parseInt(e.target.value))
								}
							/>
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
