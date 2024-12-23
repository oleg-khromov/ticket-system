'use client';
import { useCallback } from 'react';
import { actionGetCategory, actionDeleteCategory } from '@/actions/categories';
import Link from 'next/link';
import { useParams, usePathname, useRouter } from 'next/navigation';
import { formatDate } from '@/utils/formatters';
import { ConfirmationModal } from '@/components';
import { Button, Heading } from '@/components/ui';
import { routes } from '@/utils/constants';
import { useData, useConfirmationModal } from '@/hooks';
import toast from 'react-hot-toast';

export default function Category() {
	const path = usePathname();
	const router = useRouter();
	const { id } = useParams<{ id: string }>();

	const { isModalOpen, openModal, closeModal, confirmAction, setOnConfirm } =
		useConfirmationModal();

	const { data: category } = useData(
		useCallback(() => actionGetCategory(parseInt(id)), [id]),
		[id],
	);

	const handleDelete = async () => {
		const result = await actionDeleteCategory(parseInt(id));
		if (result?.success) {
			toast.success(result.success);
			router.push(routes.CATEGORIES);
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
				<Heading content={`Category: ${category?.title}`} />
				<Link
					href={`${path}${routes.EDIT}`}
					className="inline-flex btn-primary"
				>
					Edit
				</Link>
			</div>
			{category ? (
				<>
					<ul>
						<li className="flex">
							<b className="w-1/5 mr-6">Title:</b>
							{category.title}
						</li>
						<li className="flex">
							<b className="w-1/5 mr-6">Created At:</b>
							{formatDate(category.createdAt as Date)}
						</li>
						<li className="flex">
							<b className="w-1/5 mr-6">Updated At:</b>
							{formatDate(category.updatedAt as Date)}
						</li>
					</ul>
				</>
			) : (
				<p>Category is not found.</p>
			)}
			<div className="flex justify-between items-center mt-16">
				<Link href={routes.CATEGORIES} className="btn-secondary">
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
