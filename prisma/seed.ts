import { PrismaClient } from '@prisma/client';
import { getHashPassword } from '../src/lib/bcrypt';

const prisma = new PrismaClient();

enum Role {
	USER = 'USER',
	ADMIN = 'ADMIN',
}

async function main() {
	const plainPassword = 'password';
	const hashedPassword = await getHashPassword(plainPassword);
	await prisma.user.upsert({
		where: { email: 'admin@google.com' },
		update: {},
		create: {
			firstName: 'admin',
			lastName: 'admin',
			email: 'admin@google.com',
			password: hashedPassword,
			role: Role.ADMIN,
			phoneNumber: '3101234567',
		},
	});
	await prisma.user.upsert({
		where: { email: 'user@google.com' },
		update: {},
		create: {
			firstName: 'user',
			lastName: 'user',
			email: 'user@google.com',
			password: hashedPassword,
			role: Role.USER,
			phoneNumber: '3101234567',
		},
	});
	await prisma.category.upsert({
		where: { title: 'AWS' },
		update: {},
		create: {
			title: 'AWS',
		},
	});
	await prisma.category.upsert({
		where: { title: 'Azure' },
		update: {},
		create: {
			title: 'Azure',
		},
	});
}
main()
	.then(async () => {
		await prisma.$disconnect();
	})
	.catch(async (e) => {
		console.error(e);
		await prisma.$disconnect();
		process.exit(1);
	});
