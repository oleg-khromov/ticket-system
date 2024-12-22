import { NavLink } from '@/components';
import { actionLogout } from '@/actions/auth';
import { getAuthUser } from '@/lib/getAuthUser';
import { routes } from '@/utils/constants';
import { Button } from '@/components/ui';

export default async function Navigation() {
	const authUser = await getAuthUser();
	return (
		<nav>
			<NavLink label="Home" href={routes.HOME} />
			<div>
				{authUser ? (
					<>
						<NavLink label="Categories" href={routes.CATEGORIES} />
						<NavLink label="Tickets" href={routes.TICKETS} />
						<NavLink label="Users" href={routes.USERS} />
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
