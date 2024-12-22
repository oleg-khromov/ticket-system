import React from 'react';

export interface ISelect {
	id: string;
	name: string;
	value?: number | string;
	options: any[];
	// eslint-disable-next-line no-unused-vars
	onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

export default function Select({
	id,
	name,
	value = 1,
	options = [],
	onChange,
}: ISelect) {
	return (
		<select id={id} name={name} value={value} onChange={onChange}>
			{options?.map(({ id, title }) => (
				<option
					key={id}
					value={id}
					className={id === -1 ? 'text-slate-400' : ''}
				>
					{title}
				</option>
			))}
		</select>
	);
}
