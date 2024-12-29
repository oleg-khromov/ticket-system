import React from 'react';

export interface ISelect {
	id: string;
	name: string;
	value?: number | string;
	options: any[] | null;
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
			{options &&
				options?.map(({ id, title }) => (
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
