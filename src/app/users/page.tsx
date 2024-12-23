'use client';
import { useEffect, useState } from 'react';
import { actionGetUsers } from '@/actions/users';
import { IUser } from '@/types/interfaces';
import { TableUsers } from '@/components';
import { Heading } from '@/components/ui';

export default function Users() {
	const [users, setUsers] = useState<IUser[]>([]);
	useEffect(() => {
		const fetchUsers = async () => {
			const fetchedUsers = await actionGetUsers();
			setUsers(fetchedUsers);
		};
		fetchUsers();
	}, []);
	return (
		<div>
			<Heading content="Users" />
			{users.length ? <TableUsers users={users} /> : ''}
		</div>
	);
}
