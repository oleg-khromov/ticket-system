import { NavLink } from '@/components';
import { actionLogout } from '@/actions/auth';
import { getAuthUser } from '@/lib/getAuthUser';

export default async function Navigation() {
	const authUser = await getAuthUser();
	return (
		<nav>
			<NavLink label="Home" href="/" />
			<div>
				{authUser ? (
					<>
						<NavLink label="Categories" href="/categories" />
						<NavLink label="Tickets" href="/tickets" />
						<NavLink label="Users" href="/users" />
						<form action={actionLogout}>
							<button className="nav-link">Logout</button>
						</form>
					</>
				) : (
					<>
						<NavLink label="Sign In" href="/signin" />
						<NavLink label="Sign Up" href="/signup" />
					</>
				)}
			</div>
		</nav>
	);
}
