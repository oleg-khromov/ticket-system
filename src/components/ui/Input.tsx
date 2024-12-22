import React from 'react';

export interface IInput {
	id: string;
	type?: string;
	name: string;
	autoComplete?: string;
	defaultValue?: string;
	// value?: string;
	// onChange?: () => void;
}

export default function Input({
	id,
	type = 'text',
	name,
	autoComplete = 'off',
	defaultValue = '',
	// value = '',
	// onChange,
}: IInput) {
	return (
		<input
			id={id}
			type={type}
			name={name}
			autoComplete={autoComplete}
			defaultValue={defaultValue}
			// value={value}
			// onChange={onChange}
		/>
	);
}
