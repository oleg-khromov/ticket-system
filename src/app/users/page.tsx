'use client';
import { actionGetUsers } from '@/actions/users';
import { TableUsers } from '@/components';
import { Heading } from '@/components/ui';
import { useData } from '@/hooks';

export default function Users() {
	const { data: users } = useData(actionGetUsers, []);
	return (
		<div>
			<Heading content="Users" className="mb-12" />
			{users && users.length ? <TableUsers users={users} /> : ''}
		</div>
	);
}
