'use client';
import { useEffect, useState } from 'react';
import { actionGetCategory, actionDeleteCategory } from '@/actions/categories';
import Link from 'next/link';
import { useParams, usePathname } from 'next/navigation';
import { formatDate } from '@/utils/formatters';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import { useConfirmationModal } from '@/hooks/useConfirmationModal';
import { ConfirmationModal } from '@/components';
import { routes } from '@/utils/constants';
import { Button } from '@/components/ui';
import { ICategory } from '@/types/interfaces';

export default function Category() {
	const path = usePathname();
	const router = useRouter();
	const { id } = useParams<{ id: string }>();
	const [category, setCategory] = useState<ICategory | null>(null);
	const { isModalOpen, openModal, closeModal, confirmAction, setOnConfirm } =
		useConfirmationModal();
	useEffect(() => {
		if (id) {
			const fetchCategory = async () => {
				const fetchedCategory = await actionGetCategory(parseInt(id));
				setCategory(fetchedCategory);
			};
			fetchCategory();
		}
	}, [id]);

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
			<h1 className="title">Category {category?.title}</h1>
			<div className="mb-10">
				<Link href={routes.CATEGORIES} className="text-link">
					Back to all categories
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
				<p>Category is not found.</p>
			)}
			<ConfirmationModal
				isOpen={isModalOpen}
				onClose={closeModal}
				onConfirm={confirmAction}
			/>
		</div>
	);
}
