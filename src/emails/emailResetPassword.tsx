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

interface IEmailTemplateProps {
	token: string;
}

const baseUrl = process.env.PUBLIC_URL ? process.env.PUBLIC_URL : '';

const EmailResetPassword = (props: IEmailTemplateProps) => {
	const resetPasswordUrl =
		baseUrl + '/change-password/' + encodeURIComponent(props.token);
	return (
		<Tailwind>
			<Html lang="en">
				<Head />
				<Preview>Reset password.</Preview>
				<Body className="mx-auto bg-white p-4 font-sans">
					<Container>
						<Heading className="text-2xl">
							Instructions to reset password.
						</Heading>
						<Text className="-mt-2">
							To set new password follow the next link{' '}
							<Link href={resetPasswordUrl}>Reset password</Link>!
						</Text>
					</Container>
				</Body>
			</Html>
		</Tailwind>
	);
};

export default EmailResetPassword;
