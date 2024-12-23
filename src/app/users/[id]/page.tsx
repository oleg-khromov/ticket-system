'use client';
import { useCallback } from 'react';
import { actionGetUser, actionDeleteUser } from '@/actions/users';
import Link from 'next/link';
import { useParams, usePathname, useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import { routes } from '@/utils/constants';
import { ConfirmationModal } from '@/components';
import { Button, Heading } from '@/components/ui';
import { useData, useConfirmationModal } from '@/hooks';

export default function User() {
	const path = usePathname();
	const router = useRouter();
	const { id } = useParams<{ id: string }>();
	const { isModalOpen, openModal, closeModal, confirmAction, setOnConfirm } =
		useConfirmationModal();

	const { data: user } = useData(
		useCallback(() => actionGetUser(parseInt(id)), [id]),
		[id],
	);

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
			<div className="flex justify-between items-center mb-12">
				<Heading content={`User: ${user?.firstName} ${user?.lastName}`} />
				<Link
					href={`${path}${routes.EDIT}`}
					className="inline-flex btn-primary"
				>
					Edit
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
				</>
			) : (
				<p>User is not found.</p>
			)}
			<div className="flex justify-between items-center mt-16">
				<Link href={routes.USERS} className="btn-secondary">
					Back
				</Link>
				<Button text="Delete" onClick={handleOpenDeleteModal} />
			</div>
			<ConfirmationModal
				isOpen={isModalOpen}
				onClose={closeModal}
				onConfirm={confirmAction}
			/>
		</div>
	);
}
