'use client';
import { useEffect, useState } from 'react';
import { actionGetUser, actionDeleteUser } from '@/actions/users';
import Link from 'next/link';
import { useParams, usePathname } from 'next/navigation';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import { useConfirmationModal } from '@/hooks/useConfirmationModal';
import { ConfirmationModal } from '@/components';
import { routes } from '@/utils/constants';
import { Button, Heading } from '@/components/ui';
import { IUser } from '@/types/interfaces';

export default function User() {
	const path = usePathname();
	const router = useRouter();
	const { id } = useParams<{ id: string }>();
	const { isModalOpen, openModal, closeModal, confirmAction, setOnConfirm } =
		useConfirmationModal();
	const [user, setUser] = useState<IUser | null>(null);
	useEffect(() => {
		if (id) {
			const fetchUser = async () => {
				const fetchedUser = await actionGetUser(parseInt(id));
				setUser(fetchedUser);
			};
			fetchUser();
		}
	}, [id]);

	const handleDelete = async () => {
		const result = await actionDeleteUser(parseInt(id));
		if (result?.success) {
			toast.success(result.success);
			router.push(routes.USERS);
		}
		if (result?.message) toast.error(result.message);
	};

	const handleOpenDeleteModal = () => {
		setOnConfirm(() => handleDelete());
		openModal();
	};
	return (
		<div>
			<Heading content={`User ${user?.firstName} ${user?.lastName}`} />
			<div className="mb-10">
				<Link href={routes.USERS} className="text-link">
					Back to all users
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
							href={`${path}${routes.EDIT}`}
							className="inline-flex btn-primary mr-6"
						>
							Edit
						</Link>
						<Button text="Delete" onClick={handleOpenDeleteModal} />
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
