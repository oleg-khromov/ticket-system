'use server';
import { EmailConfirmation, EmailResetPassword } from '@/emails';
import * as React from 'react';
import { Resend } from 'resend';

export const sendConfirmationEmail = async (email: string) => {
	const resend = new Resend(process.env.RESEND_API_KEY);
	const res = await resend.emails.send({
		from: 'Ticket System <onboarding@resend.dev>',
		to: email,
		subject: 'Confirmation registration on TicketSystem',
		react: React.createElement(EmailConfirmation),
		headers: {
			// this is important for if the subscriber has to resend the confirmation email.
			// the date header ensures there is a change in the email and it is not marked as spam.
			Date: new Date().toUTCString(),
		},
	});
	return res;
};

export const sendResetPasswordEmail = async (email: string, token: string) => {
	const resend = new Resend(process.env.RESEND_API_KEY);
	const res = await resend.emails.send({
		from: 'Ticket System <onboarding@resend.dev>',
		to: email,
		subject: 'Reset password on TicketSystem',
		react: React.createElement(EmailResetPassword, { token }),
		headers: {
			Date: new Date().toUTCString(),
		},
	});
	return res;
};
