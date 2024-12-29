import { StateCreator } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import { produce } from 'immer';
import { ITicket, StatusType } from '@/types/interfaces';

export interface ITicketsState {
	tickets: ITicket[];
	setTickets: (tickets: ITicket[]) => void;
	addTicket: (ticket: ITicket) => void;
	editTicket: (id: number, updates: ITicket) => void;
	editTicketStatus: (id: number, status: StatusType) => void;
	editTicketAssignedTo: (id: number, assignedTo: number) => void;
}

const ticketsSlice: StateCreator<ITicketsState, [], [], ITicketsState> = (
	set,
) => ({
	tickets: [],
	setTickets: (tickets: ITicket[]) =>
		set(
			produce((state: ITicketsState) => {
				state.tickets = tickets;
			}),
		),
	addTicket: (ticket: ITicket) =>
		set(
			produce((state: ITicketsState) => {
				state.tickets.push(ticket);
			}),
		),
	editTicket: (id: number, updates: ITicket) =>
		set(
			produce((state: ITicketsState) => {
				const user = state.tickets.find((t) => t.id === id);
				if (user) Object.assign(user, updates);
			}),
		),
	editTicketStatus: (id: number, status: StatusType) =>
		set(
			produce((state: ITicketsState) => {
				const ticket = state.tickets.find((t) => t.id === id);
				if (ticket) ticket.status = status;
			}),
		),
	editTicketAssignedTo: (id: number, assignedTo: number) =>
		set(
			produce((state: ITicketsState) => {
				const ticket = state.tickets.find((t) => t.id === id);
				if (ticket) ticket.assignedTo = assignedTo;
			}),
		),
});

export const createTicketsSlice = persist(
	devtools(ticketsSlice, { name: 'ticketsStore' }),
	{ name: 'ticketsStore' },
);
