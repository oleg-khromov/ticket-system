'use client';
import { useEffect, useState, useActionState } from 'react';
import { actionGetCategories } from '@/actions/categories';
import { actionGetTicket, actionUpdateTicket } from '@/actions/tickets';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import toast from 'react-hot-toast';
import { routes } from '@/utils/constants';
import { Button } from '@/components/ui';
import { FormInputBox } from '@/components/';
import { ICategory, ITicket } from '@/types/interfaces';

export default function EditTicket() {
	const { id } = useParams<{ id: string }>();
	const [ticket, setTicket] = useState<ITicket | null>(null);
	const [categories, setCategories] = useState<ICategory[]>([]);
	const [selectedCategory, setSelectedCategory] = useState(1);
	const [state, action, isPending] = useActionState(
		actionUpdateTicket,
		undefined,
	);

	useEffect(() => {
		if (id) {
			const fetchTicket = async () => {
				const fetchedTicket = await actionGetTicket(parseInt(id));
				setTicket(fetchedTicket);
			};
			fetchTicket();
			const fetchCategories = async () => {
				const fetchedCategories = await actionGetCategories();
				setCategories(fetchedCategories);
			};
			fetchCategories();
		}
	}, [id, isPending]);

	useEffect(() => {
		setSelectedCategory(ticket?.categoryId || 1);
	}, [ticket]);

	useEffect(() => {
		if (state?.message) toast.success(state.message);
		if (state?.errors?.title) toast.error(state.errors.title);
	}, [state]);
	return (
		<div>
			<h1 className="title">Edit ticket {ticket?.title}</h1>
			<div className="mb-10">
				<Link href={routes.TICKETS} className="text-link">
					Back to all tickets
				</Link>
			</div>
			{ticket ? (
				<div className="container w-3/4">
					<form action={action} autoComplete="off" className="space-y-4">
						<input type="hidden" name="id" value={id} />
						{/* <FormInputBox
							id="categoryId"
							name="categoryId"
							labelText="Category"
							defaultValue={state?.categoryId ?? ''}
							errors={state?.errors?.categoryId}
						/> */}
						<div>
							<label htmlFor="categoryId">Category</label>
							<select
								id="categoryId"
								name="categoryId"
								value={selectedCategory || ticket.categoryId}
								onChange={(e) => setSelectedCategory(parseInt(e.target.value))}
							>
								{categories?.map(({ id, title }) => (
									<option key={id} value={id}>
										{title}
									</option>
								))}
							</select>
							{state?.errors?.category && (
								<p className="error">{state.errors.category}</p>
							)}
						</div>
						<FormInputBox
							id="title"
							name="title"
							labelText="Title"
							defaultValue={(state?.data?.title || ticket.title) ?? ''}
							errors={state?.errors?.title}
						/>
						{/* <div>
							<label htmlFor="title">Title</label>
							<input
								id="title"
								type="text"
								name="title"
								autoComplete="off"
								defaultValue={(state?.title || ticket.title) ?? ''}
							/>
							{state?.errors?.title && (
								<p className="error">{state.errors.title}</p>
							)}
						</div> */}
						{/* <FormInputBox
							id="content"
							name="content"
							labelText="Content"
							defaultValue={(state?.content || ticket.content) ?? ''}
							errors={state?.errors?.content}
						/> */}
						<div>
							<label htmlFor="content">Content</label>
							<textarea
								id="content"
								name="content"
								autoComplete="off"
								defaultValue={(state?.data?.content || ticket.content) ?? ''}
							/>
							{state?.errors?.content && (
								<p className="error">{state.errors.content}</p>
							)}
						</div>
						<div className="flex items-end gap-4">
							<Button text="Save" disabled={isPending} />
						</div>
					</form>
				</div>
			) : (
				''
			)}
		</div>
	);
}
