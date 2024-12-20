'use server';
import prisma from '@/lib/db';
// import { AddTicketFormSchema, UpdateTicketFormSchema } from '@/lib/validation';
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
