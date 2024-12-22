import React from 'react';

export interface ITextError {
	errors?: React.ReactNode;
	errorClassName?: string;
}

export default function TextError({
	errors = '',
	errorClassName = 'error',
}: ITextError) {
	return <p className={errorClassName}>{errors}</p>;
}
