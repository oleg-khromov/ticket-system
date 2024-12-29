import React from 'react';

interface IForm {
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
