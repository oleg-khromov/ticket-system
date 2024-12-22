import React from 'react';

interface IButton {
	text: React.ReactNode;
	disabled?: boolean;
	className?: string;
	onClick?: () => void;
}

export default function Button({
	text,
	disabled = false,
	className = 'btn-primary',
	onClick,
}: IButton) {
	return (
		<button disabled={disabled} className={className} onClick={onClick}>
			{text}
		</button>
	);
}
