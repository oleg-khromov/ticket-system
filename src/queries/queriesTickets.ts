import prisma from '@/lib/db';
import { ITicket, StatusType } from '@/types/interfaces';

export async function getTicketById(id: number) {
	return await prisma.ticket.findUnique({
		where: {
			id,
		},
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
	});
}

export async function getTicketByCategoryId(categoryId: number) {
	return await prisma.ticket.findFirst({
		where: {
			categoryId,
		},
		select: {
			id: true,
		},
	});
}

export async function getTicketByTitleAndCategoryId(
	title: string,
	categoryId: number,
) {
	return await prisma.ticket.findFirst({
		where: {
			title,
			categoryId,
		},
		select: {
			id: true,
		},
	});
}

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

export async function createTicket(data: ITicket) {
	return await prisma.ticket.create({
		data,
	});
}

export async function updateTicket(id: number, data: ITicket) {
	return await prisma.ticket.update({
		where: {
			id,
		},
		data,
	});
}

export async function updateTicketStatus(id: number, status: StatusType) {
	return await prisma.ticket.update({
		where: {
			id,
		},
		data: {
			status,
		},
	});
}

export async function updateTicketAssignedTo(id: number, assignedTo: number) {
	return await prisma.ticket.update({
		where: {
			id,
		},
		data: {
			assignedTo,
		},
	});
}
