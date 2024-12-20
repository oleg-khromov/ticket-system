'use client';
import { useEffect, useState } from 'react';
import { getCategories } from '@/actions/categories';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface ICategory {
	id: number;
	title: string;
}

export default function Categories() {
	const path = usePathname();
	const [categories, setCategories] = useState<ICategory[]>([]);
	useEffect(() => {
		const fetchCategories = async () => {
			const fetchedCategories = await getCategories();
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
										<Link href={`${path}/${id}/edit`} className="text-link">
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
				<Link href={`${path}/new`} className="btn-primary">
					Add category
				</Link>
			</p>
		</div>
	);
}
