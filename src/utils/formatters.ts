import dayjs from 'dayjs';

export const formatDate = (
	date: Date,
	format: string = 'MMMM DD, YYYY HH:MM',
) => {
	const parsedDate = dayjs(date);
	return parsedDate.format(format);
};
