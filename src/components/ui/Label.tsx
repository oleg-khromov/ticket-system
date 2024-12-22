import React from 'react';

export interface ILabel {
	htmlFor?: string;
	labelText: React.ReactNode;
	mandatory?: boolean;
}

export default function Label({
	htmlFor = '',
	labelText,
	mandatory = false,
}: ILabel) {
	return (
		<label htmlFor={htmlFor}>
			{labelText}
			{mandatory ? <span className="mandatory">*</span> : ''}
		</label>
	);
}
