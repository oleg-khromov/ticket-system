'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { routes } from '@/utils/constants';
import { ITicketWithFullInformation } from '@/types/interfaces';
import { formatDate } from '@/utils/formatters';

export default function TableTickets({
	tickets,
}: {
	tickets: ITicketWithFullInformation[];
}) {
	const path = usePathname();
	return (
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
	);
}
