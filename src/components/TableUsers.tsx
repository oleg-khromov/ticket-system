'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { routes } from '@/utils/constants';
import { IUser } from '@/types/interfaces';

export default function TableUsers({ users }: { users: IUser[] }) {
	const path = usePathname();
	return (
		<table>
			<thead>
				<tr>
					<th scope="col">FirstName</th>
					<th scope="col">LastName</th>
					<th scope="col">Email</th>
					<th scope="col">Role</th>
					<th scope="col">PhoneNumber</th>
					<th scope="col">
						<span>&nbsp;</span>
					</th>
				</tr>
			</thead>
			<tbody>
				{users.map(({ id, firstName, lastName, email, role, phoneNumber }) => {
					return (
						<tr key={email}>
							<td>
								<Link href={`${path}/${id}`} className="text-link">
									{firstName}
								</Link>
							</td>
							<td>{lastName}</td>
							<td>{email}</td>
							<td>{role}</td>
							<td>{phoneNumber}</td>
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
				})}
			</tbody>
		</table>
	);
}
