import { PrismaClient } from '@prisma/client';
import { getHashPassword } from '../src/lib/bcrypt';

const prisma = new PrismaClient();

enum Role {
	USER = 'USER',
	ADMIN = 'ADMIN',
}

async function main() {
	const plainPassword = 'admin';
	const hashedPassword = await getHashPassword(plainPassword);
	const user = await prisma.user.upsert({
		where: { email: 'admin@script.nl' },
		update: {},
		create: {
			firstName: 'admin',
			lastName: 'admin',
			email: 'admin@script.nl',
			password: hashedPassword,
			role: Role.ADMIN,
			phoneNumber: '3101234567',
		},
	});
	console.log({ user });
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