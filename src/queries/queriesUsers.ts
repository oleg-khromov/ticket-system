import prisma from '@/lib/db';
import {
	TICKET_STATUS,
	RoleType,
	IUser,
	IUserWithPassword,
} from '@/types/interfaces';

export async function getUserById(id: number) {
	return await prisma.user.findUnique({
		where: {
			id,
		},
	});
}

export async function getUserByEmail(email: string) {
	return await prisma.user.findUnique({
		where: {
			email,
		},
		select: {
			id: true,
			email: true,
		},
	});
}

export async function getUserWithPasswordByEmail(email: string) {
	return await prisma.user.findUnique({
		where: {
			email,
		},
		select: {
			id: true,
			email: true,
			password: true,
			role: true,
		},
	});
}

export async function getUserWithUnresolvedTickets(id: number) {
	return await prisma.ticket.findFirst({
		where: {
			OR: [
				{
					assignedTo: id,
					status: TICKET_STATUS.Pending,
				},
				{
					assignedTo: id,
					status: TICKET_STATUS.InProgress,
				},
				{
					createdBy: id,
					status: TICKET_STATUS.Pending,
				},
				{
					createdBy: id,
					status: TICKET_STATUS.InProgress,
				},
			],
		},
	});
}

export async function getUsers() {
	return await prisma.user.findMany({
		orderBy: [
			{
				firstName: 'asc',
			},
			{
				lastName: 'asc',
			},
		],
	});
}

export async function getUsersByRole(role: RoleType) {
	return await prisma.user.findMany({
		where: {
			role,
		},
		orderBy: [
			{
				firstName: 'asc',
			},
			{
				lastName: 'asc',
			},
		],
	});
}

export async function getUsersByEmailAndExcludeById(id: number, email: string) {
	return await prisma.user.findMany({
		where: {
			id: {
				not: id,
			},
			email,
		},
		select: {
			id: true,
		},
	});
}

export async function createUser(data: IUserWithPassword) {
	return await prisma.user.create({
		data,
	});
}

export async function updateUser(id: number, data: IUser) {
	return await prisma.user.update({
		where: { id },
		data,
	});
}

export async function updateUserPassword(id: number, password: string) {
	await prisma.user.update({
		where: { id },
		data: { password },
	});
}

export async function deleteUser(id: number) {
	return await prisma.user.delete({
		where: {
			id,
		},
	});
}
