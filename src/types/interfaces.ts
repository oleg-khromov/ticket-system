export enum USER_ROLE {
	USER = 'USER',
	ADMIN = 'ADMIN',
}

export enum TICKET_STATUS {
	Pending = 'Pending',
	InProgress = 'InProgress',
	Resolved = 'Resolved',
}

export type RoleType = keyof typeof USER_ROLE;
export type StatusType = keyof typeof TICKET_STATUS;

export interface IUser {
	id?: number;
	firstName: string;
	lastName: string;
	email: string;
	role?: RoleType;
	phoneNumber?: string | null;
	createdAt?: Date;
	updatedAt?: Date;
}

export interface IUserWithPassword extends IUser {
	password: string;
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
	assignedTo?: number | null;
	categoryId: number;
	createdAt?: Date;
	updatedAt?: Date;
}

export interface ITicketWithFullInformation extends ITicket {
	createdByUser: IUser;
	assignedToUser?: IUser | null;
	category: ICategory;
}

export interface IActionFormState {
	errors?: Record<string, string | string[]>;
	data?: Record<string, string | number | Date | null>;
	message?: string;
	success?: boolean;
}

export interface IForm {
	action: (payload: FormData) => void;
	autoComplete?: string;
	className?: string;
	isPending: boolean;
	state: IActionFormState | undefined;
}
