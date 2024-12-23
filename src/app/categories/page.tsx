'use client';
import { useEffect, useState } from 'react';
import { actionGetCategories } from '@/actions/categories';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { routes } from '@/utils/constants';
import { ICategory } from '@/types/interfaces';
import { Heading } from '@/components/ui';
import { TableCategories } from '@/components';

export default function Categories() {
	const path = usePathname();
	const [categories, setCategories] = useState<ICategory[]>([]);
	useEffect(() => {
		const fetchCategories = async () => {
			const fetchedCategories = await actionGetCategories();
			setCategories(fetchedCategories);
		};
		fetchCategories();
	}, []);
	return (
		<div>
			<Heading content="Categories" />
			{categories.length ? (
				<TableCategories categories={categories} />
			) : (
				<p className="text-center mb-6">Add your first category.</p>
			)}
			<p className="text-center">
				<Link href={`${path}${routes.NEW}`} className="btn-primary">
					Add category
				</Link>
			</p>
		</div>
	);
}
