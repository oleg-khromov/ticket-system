'use client';
import { useEffect, useState } from 'react';
import { actionGetCategories } from '@/actions/categories';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { routes } from '@/utils/constants';
import { ICategory } from '@/types/interfaces';

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
			<h1 className="title">Categories</h1>
			{categories.length ? (
				<table>
					<thead>
						<tr>
							<th scope="col" className="w-10/12">
								Title
							</th>
							<th scope="col">
								<span>&nbsp;</span>
							</th>
						</tr>
					</thead>
					<tbody>
						{categories.map(({ id, title }) => {
							return (
								<tr key={title}>
									<td>
										<Link href={`${path}/${id}`} className="text-link">
											{title}
										</Link>
									</td>
									<td>
										<Link
											href={`${path}/${id}${routes.EDIT}`}
											className="text-link"
										>
											<b>Edit</b>
										</Link>
									</td>
								</tr>
							);
						})}
					</tbody>
				</table>
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
