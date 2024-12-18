import * as React from 'react';
import {
	Body,
	Container,
	Head,
	Heading,
	Html,
	Preview,
	Text,
	Tailwind,
	Link,
} from '@react-email/components';

const baseUrl = process.env.PUBLIC_URL ? process.env.PUBLIC_URL : '';

const EmailConfirmation = () => (
	<Tailwind>
		<Html lang="en">
			<Head />
			<Preview>Confirmation your registration</Preview>
			<Body className="mx-auto bg-white p-4 font-sans">
				<Container>
					<Heading className="text-2xl">Congratulations!</Heading>
					<Text className="-mt-2">
						You have successfully registered on the{' '}
						<Link href={baseUrl}>TicketSystem</Link>!
					</Text>
				</Container>
			</Body>
		</Html>
	</Tailwind>
);

export default EmailConfirmation;
