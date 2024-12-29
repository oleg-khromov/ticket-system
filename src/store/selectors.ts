import { ICategory, ITicket, TICKET_STATUS } from '@/types/interfaces';
import { IUsersState } from '@/store/slices/usersSlice';
import { ICategoriesState } from '@/store/slices/categoriesSlice';
import { ITicketsState } from '@/store/slices/ticketsSlice';

// user selectors
export const selectUsers = (state: IUsersState) => state.users;

// ticket selectors
export const selectTickets = (state: ITicketsState) => state.tickets;
export const selectUnresolvedTickets = (state: ITicketsState) =>
	state.tickets.filter(
		(ticket: ITicket) =>
			ticket.status === TICKET_STATUS.Pending ||
			ticket.status === TICKET_STATUS.InProgress,
	);
export const selectTicketsByCategoryId =
	(categoryId: string) => (state: ITicketsState) =>
		state.tickets.filter(
			(ticket: ITicket) => ticket.categoryId === parseInt(categoryId),
		);

// category selectors
export const selectCategories = (state: ICategoriesState) => state.categories;
export const selectCategoryById = (id: string) => (state: ICategoriesState) =>
	state.categories.find((category: ICategory) => category.id === parseInt(id));
