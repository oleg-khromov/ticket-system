import React from 'react';

export interface ITextError {
	errors?: React.ReactNode;
	errorClassName?: string;
}

export default function TextError({
	errors = '',
	errorClassName = 'error',
}: ITextError) {
	return (
		<>
			{errors &&
				(Array.isArray(errors) ? (
					errors.map((error) => (
						<p key={error} className={errorClassName}>
							{error}
						</p>
					))
				) : (
					<p className={errorClassName}>{errors}</p>
				))}
		</>
	);
}
