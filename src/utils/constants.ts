import { USER_ROLE, TICKET_STATUS } from '@/types/interfaces';

export const routes = {
	HOME: '/',
	SIGNIN: '/signin',
	SIGNUP: '/signup',
	RESET_PASSWORD: '/reset-password',
	USERS: '/users',
	CATEGORIES: '/categories',
	TICKETS: '/tickets',
	EDIT: '/edit',
	NEW: '/new',
};

export const selectRoleOptions = [
	{
		id: USER_ROLE.ADMIN,
		title: USER_ROLE.ADMIN,
	},
	{
		id: USER_ROLE.USER,
		title: USER_ROLE.USER,
	},
];

export const selectTicketStatusOptions = Object.values(TICKET_STATUS).map(
	(status) => ({
		id: status,
		title: status,
	}),
);
