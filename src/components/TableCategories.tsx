'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { routes } from '@/utils/constants';
import { ICategory } from '@/types/interfaces';

export default function TableCategories({
	categories,
}: {
	categories: ICategory[];
}) {
	const path = usePathname();
	return (
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
	);
}
