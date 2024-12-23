import React from 'react';
import { Main, Header, Footer } from '@/components';
import { Toaster } from 'react-hot-toast';
import './globals.css';

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body className={`antialiased`}>
				<div className="min-h-screen grid grid-rows-[auto_1fr_auto]">
					<Header />
					<Main>{children}</Main>
					<Footer />
					<Toaster position="top-center" toastOptions={{ duration: 4000 }} />
				</div>
			</body>
		</html>
	);
}
