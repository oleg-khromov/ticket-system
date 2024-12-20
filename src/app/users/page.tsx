'use client';
import { useEffect, useState } from 'react';
import { getUsers } from '@/actions/users';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

type Role = 'ADMIN' | 'USER';

interface IUser {
	id: number;
	firstName?: string;
	lastName?: string;
	email?: string;
	role?: Role;
	phoneNumber?: string | null;
	createdAt?: Date;
	updatedAt?: Date;
	password?: string;
}

export default function Users() {
	const path = usePathname();
	const [users, setUsers] = useState<IUser[]>([]);
	useEffect(() => {
		const fetchUsers = async () => {
			const fetchedUsers = await getUsers();
			setUsers(fetchedUsers);
		};
		fetchUsers();
	}, []);
	return (
		<div>
			<h1 className="title">Users</h1>
			{users.length ? (
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
						{users.map(
							({ id, firstName, lastName, email, role, phoneNumber }) => {
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
				''
			)}
		</div>
	);
}
