import dayjs from 'dayjs';

export const formatDate = (date: Date, format: string = 'MM/DD/YY HH:MM') => {
	const parsedDate = dayjs(date);
	return parsedDate.format(format);
};
