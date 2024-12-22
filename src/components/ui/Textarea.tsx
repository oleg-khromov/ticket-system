import React from 'react';

export interface ITextarea {
	id: string;
	name: string;
	autoComplete?: string;
	defaultValue?: string;
}

export default function Input({
	id,
	name,
	autoComplete = 'off',
	defaultValue = '',
}: ITextarea) {
	return (
		<textarea
			id={id}
			name={name}
			autoComplete={autoComplete}
			defaultValue={defaultValue}
		/>
	);
}
