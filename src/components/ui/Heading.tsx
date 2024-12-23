import React from 'react';

interface IHeading {
	content: string;
	className?: string;
}

export default function Heading({ content, className }: IHeading) {
	return <h1 className={`title ${className ? className : ''}`}>{content}</h1>;
}
