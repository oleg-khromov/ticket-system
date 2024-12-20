'use client';
import { useEffect, useState } from 'react';
import { getUser, deleteUser } from '@/actions/users';
import Link from 'next/link';
import { useParams, usePathname } from 'next/navigation';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import { useConfirmationModal } from '@/hooks/useConfirmationModal';
import { ConfirmationModal } from '@/components/ConfirmationModal';

// enum Role {
// 	ADMIN = 'ADMIN',
// 	USER = 'USER',
// }

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

export default function User() {
	const path = usePathname();
	const router = useRouter();
	const { id } = useParams<{ id: string }>();
	const [user, setUser] = useState<IUser | null>(null);
	const { isModalOpen, openModal, closeModal, confirmAction, setOnConfirm } =
		useConfirmationModal();
	useEffect(() => {
		if (id) {
			const fetchUser = async () => {
				const fetchedUser = await getUser(parseInt(id));
				setUser(fetchedUser);
			};
			fetchUser();
		}
	}, [id]);

	const handleDelete = async () => {
		const result = await deleteUser(parseInt(id));
		if (result?.success) {
			toast.success(result.success);
			router.push('/users');
		}
		if (result?.errors) toast.error(result.errors);
	};

	const handleOpenDeleteModal = () => {
		setOnConfirm(() => handleDelete());
		openModal();
	};
	return (
		<div>
			<h1 className="title">User {`${user?.firstName} ${user?.lastName}`}</h1>
			<div className="mb-10">
				<Link href="/users" className="text-link">
					Back to all categories
				</Link>
			</div>
			{user ? (
				<>
					<ul>
						<li className="flex">
							<b className="w-1/5 mr-6">First Name:</b>
							{user.firstName}
						</li>
						<li className="flex">
							<b className="w-1/5 mr-6">Last Name:</b>
							{user.lastName}
						</li>
						<li className="flex">
							<b className="w-1/5 mr-6">Email:</b>
							{user.email}
						</li>
						<li className="flex">
							<b className="w-1/5 mr-6">Role:</b>
							{user.role}
						</li>
						<li className="flex">
							<b className="w-1/5 mr-6">Phone Number:</b>
							{user.phoneNumber}
						</li>
					</ul>
					<div className="mt-16">
						<Link
							href={`${path}/edit`}
							className="inline-flex btn-primary mr-6"
						>
							Edit
						</Link>
						<button className="btn-primary" onClick={handleOpenDeleteModal}>
							Delete
						</button>
					</div>
				</>
			) : (
				<p>User is not found.</p>
			)}
			<ConfirmationModal
				isOpen={isModalOpen}
				onClose={closeModal}
				onConfirm={confirmAction}
			/>
		</div>
	);
}
