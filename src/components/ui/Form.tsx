import React from 'react';

interface IForm {
	// eslint-disable-next-line no-unused-vars
	action: (payload: FormData) => void;
	autoComplete?: string;
	children: React.ReactNode;
	className?: string;
}

export default function Form({
	action,
	autoComplete = 'off',
	children,
	className = 'space-y-4',
}: IForm) {
	return (
		<form action={action} autoComplete={autoComplete} className={className}>
			{children}
		</form>
	);
}
