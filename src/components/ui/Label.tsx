import React from 'react';

export interface ILabel {
	htmlFor?: string;
	labelText: React.ReactNode;
	required?: boolean;
}

export default function Label({
	htmlFor = '',
	labelText,
	required = false,
}: ILabel) {
	return (
		<label htmlFor={htmlFor}>
			{labelText}
			{required ? <span className="required">*</span> : ''}
		</label>
	);
}
