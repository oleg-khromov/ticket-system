import prisma from '@/lib/db';
import { IUser } from '@/types/interfaces';
import { STATUS, RoleType, IUserWithouPassword } from '@/types/interfaces';

export async function getUserById(id: number) {
	return await prisma.user.findUnique({
		where: {
			id,
		},
		select: {
			id: true,
			firstName: true,
			lastName: true,
			email: true,
			role: true,
			phoneNumber: true,
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
		},
	});
}

export async function getUserWithUnresolvedTickets(assignedTo: number) {
	return await prisma.ticket.findFirst({
		where: {
			OR: [
				{
					assignedTo,
					status: STATUS.Pending,
				},
				{
					assignedTo,
					status: STATUS.InProgress,
				},
			],
		},
	});
}

export async function getUsers() {
	return await prisma.user.findMany({
		select: {
			id: true,
			firstName: true,
			lastName: true,
			email: true,
			role: true,
			phoneNumber: true,
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

export async function getUsersByRole(role: RoleType) {
	return await prisma.user.findMany({
		where: {
			role,
		},
		select: {
			id: true,
			firstName: true,
			lastName: true,
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

export async function createUser(data: IUser) {
	return await prisma.user.create({
		data,
	});
}

export async function updateUser(id: number, data: IUserWithouPassword) {
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
