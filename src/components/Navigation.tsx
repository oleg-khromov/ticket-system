'use client';
import { NavLink } from '@/components';

export default function Navigation() {
	return (
		<nav>
			<NavLink label="Home" href="/" />
			<div>
				<NavLink label="Sign In" href="/signin" />
				<NavLink label="Sign Up" href="/signup" />
				<NavLink label="Dashboard" href="/dashboard" />
			</div>
		</nav>
	);
}
