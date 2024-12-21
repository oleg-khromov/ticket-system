export enum ROLE {
	// eslint-disable-next-line no-unused-vars
	USER = 'USER',
	// eslint-disable-next-line no-unused-vars
	ADMIN = 'ADMIN',
}

export enum STATUS {
	// eslint-disable-next-line no-unused-vars
	Pending = 'Pending',
	// eslint-disable-next-line no-unused-vars
	InProgress = 'InProgress',
	// eslint-disable-next-line no-unused-vars
	Resolved = 'Resolved',
}

export type RoleType = keyof typeof ROLE;
export type StatusType = keyof typeof STATUS;
export type IUserWithouPassword = Omit<IUser, 'password'>;

export interface IUser {
	id?: number;
	firstName: string;
	lastName: string;
	email: string;
	password: string;
	role?: RoleType;
	phoneNumber?: string;
	createdAt?: Date;
	updatedAt?: Date;
}

export interface IPasswordResetToken {
	token: string;
	userId: number;
	expiresAt: Date;
}

export interface ICategory {
	id?: number;
	title: string;
	createdAt?: Date;
	updatedAt?: Date;
}

export interface ITicket {
	id?: number;
	title: string;
	content: string;
	status?: StatusType;
	createdBy: number;
	assignedTo?: number;
	categoryId: number;
	createdAt?: Date;
	updatedAt?: Date;
}
