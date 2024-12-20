'use server';
import prisma from '@/lib/db';
import { AddTicketFormSchema } from '@/lib/validation';
import { getAuthUser } from '@/lib/getAuthUser';

// import { redirect } from 'next/navigation';

export async function getTickets() {
	return await prisma.ticket.findMany({
		include: {
			createdByUser: {
				select: {
					firstName: true,
					lastName: true,
				},
			},
			assignedToUser: {
				select: {
					firstName: true,
					lastName: true,
				},
			},
			category: {
				select: {
					title: true,
				},
			},
		},
		orderBy: {
			createdAt: 'asc',
		},
	});
}

export interface AddUpdateTicketFormState {
	errors?: Record<string, string | string[]>;
	message?: string;
	title?: string;
	content?: string;
	categoryId?: string;
}

export async function addTicket(
	state: AddUpdateTicketFormState | undefined,
	formData: FormData,
): Promise<AddUpdateTicketFormState | undefined> {
	const ticket = {
		categoryId: formData.get('categoryId') as string,
		title: formData.get('title') as string,
		content: formData.get('content') as string,
	};
	console.log(ticket, 'ticket');

	const validatedFields = AddTicketFormSchema.safeParse(ticket);

	if (!validatedFields.success)
		return {
			errors: validatedFields.error.flatten().fieldErrors,
			...ticket,
		};

	const { categoryId, title } = validatedFields.data;

	const existingTicket = await prisma.ticket.findFirst({
		where: {
			title,
			categoryId: parseInt(categoryId),
		},
		select: {
			id: true,
		},
	});

	if (existingTicket)
		return {
			errors: {
				title: 'Duplicate. This category already has a ticket with that title.',
			},
			...ticket,
			message: 'HI',
		};

	const user = await getAuthUser();
	console.log(user, 'user');

	const createdTicket = await prisma.ticket.create({
		data: {
			...ticket,
			createdBy: parseInt(user?.userId as string),
			categoryId: parseInt(categoryId),
		},
	});

	if (!createdTicket)
		return {
			message: 'An error occurred while creating new ticket.',
		};

	return {
		message: 'New ticket has created successfully.',
	};
}
