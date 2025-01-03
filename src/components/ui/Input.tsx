import React from 'react';

export interface IInput {
	id: string;
	type?: string;
	name: string;
	autoComplete?: string;
	defaultValue?: string;
}

export default function Input({
	id,
	type = 'text',
	name,
	autoComplete = 'off',
	defaultValue = '',
}: IInput) {
	return (
		<input
			id={id}
			type={type}
			name={name}
			autoComplete={autoComplete}
			defaultValue={defaultValue}
		/>
	);
}
