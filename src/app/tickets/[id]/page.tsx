'use client';
import { useEffect, useState, useCallback } from 'react';
import {
	actionGetTicket,
	actionUpdateTicketStatus,
	actionUpdateTicketAssignedTo,
} from '@/actions/tickets';
import { actionGetUsersByRole } from '@/actions/users';
import { useParams, usePathname } from 'next/navigation';
import Link from 'next/link';
import { formatDate } from '@/utils/formatters';
import { routes, selectTicketStatusOptions } from '@/utils/constants';
import { StatusType, USER_ROLE } from '@/types/interfaces';
import { Select, Heading } from '@/components/ui';
import { useData } from '@/hooks';

export default function Ticket() {
	const path = usePathname();
	const { id } = useParams<{ id: string }>();

	const { data: ticket } = useData(
		useCallback(() => actionGetTicket(parseInt(id)), [id]),
		[id],
	);

	const { data: usersWithRoleAdmin } = useData(
		useCallback(() => actionGetUsersByRole(USER_ROLE.ADMIN), [id]),
		[id],
	);

	const [selectedStatus, setSelectedStatus] = useState(ticket?.status);
	const [selectedAssignedTo, setSelectedAssignedTo] = useState(0);
	const [selectAssignedToOptions, setSelectAssignedToOptions] = useState([
		{
			id: -1,
			title: 'Select',
		},
	]);

	useEffect(() => {
		let transformedUsers: any[] = [];
		if (usersWithRoleAdmin)
			transformedUsers = usersWithRoleAdmin.map(
				({ id, firstName, lastName }) => ({
					id,
					title: `${firstName} ${lastName}`,
				}),
			);
		setSelectAssignedToOptions([
			{
				id: -1,
				title: 'Select',
			},
			...transformedUsers,
		]);
	}, [id, usersWithRoleAdmin]);

	useData(
		useCallback(
			() => actionUpdateTicketStatus(id, selectedStatus as StatusType),
			[id, selectedStatus],
		),
		[selectedStatus],
	);

	useData(
		useCallback(
			() => actionUpdateTicketAssignedTo(id, selectedAssignedTo),
			[id, selectedAssignedTo],
		),
		[selectedAssignedTo],
	);
	return (
		<div>
			<div className="flex justify-between items-center mb-12">
				<Heading content={`Ticket: ${ticket?.title}`} />
				<Link
					href={`${path}${routes.EDIT}`}
					className="inline-flex btn-primary"
				>
					Edit
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
				</>
			) : (
				<p>Ticket is not found.</p>
			)}
			<div className="flex mt-16 mb-10">
				<Link href={routes.TICKETS} className="btn-secondary">
					Back
				</Link>
			</div>
		</div>
	);
}
