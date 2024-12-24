'use client';
import { NavLink } from '@/components';
import { actionLogout } from '@/actions/auth';
import { useAuth } from '@/hooks';
import { routes } from '@/utils/constants';
import { Button } from '@/components/ui';

export default function Navigation() {
	const { user, isAdmin } = useAuth();

	return (
		<nav>
			<NavLink label="Home" href={routes.HOME} />
			<div>
				{user ? (
					<>
						{isAdmin && <NavLink label="Categories" href={routes.CATEGORIES} />}
						<NavLink label="Tickets" href={routes.TICKETS} />
						{isAdmin && <NavLink label="Users" href={routes.USERS} />}
						<form action={actionLogout}>
							<Button text="Logout" className="nav-link" />
						</form>
					</>
				) : (
					<>
						<NavLink label="Sign In" href={routes.SIGNIN} />
						<NavLink label="Sign Up" href={routes.SIGNUP} />
					</>
				)}
			</div>
		</nav>
	);
}
