import React from 'react';

interface IHeading {
	content: string;
}

export default function Heading({ content }: IHeading) {
	return <h1 className="title">{content}</h1>;
}
