'use client';
import { actionGetCategories } from '@/actions/categories';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { routes } from '@/utils/constants';
import { TableCategories } from '@/components';
import { Heading } from '@/components/ui';
import { useData } from '@/hooks';

export default function Categories() {
	const path = usePathname();
	const { data: categories } = useData(actionGetCategories, []);
	return (
		<div>
			<div className="flex justify-between items-center mb-12">
				<Heading content="Categories" />
				<Link href={`${path}${routes.NEW}`} className="btn-primary">
					Add category
				</Link>
			</div>
			{categories ? (
				<TableCategories categories={categories} />
			) : (
				<p className="text-center mb-6">Add your first category.</p>
			)}
		</div>
	);
}
