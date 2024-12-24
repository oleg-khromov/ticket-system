import prisma from '@/lib/db';
import { ITicket, StatusType } from '@/types/interfaces';

export async function getTicketById(id: number) {
	return await prisma.ticket.findUnique({
		where: {
			id,
		},
		include: {
			createdByUser: {},
			assignedToUser: {},
			category: {},
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
			createdByUser: {},
			assignedToUser: {},
			category: {},
		},
		orderBy: {
			createdAt: 'asc',
		},
	});
}

export async function getTicketsByCreatorId(id: number) {
	return await prisma.ticket.findMany({
		where: {
			createdBy: id,
		},
		include: {
			createdByUser: {},
			assignedToUser: {},
			category: {},
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
