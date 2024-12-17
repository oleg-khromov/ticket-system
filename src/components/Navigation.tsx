import { NavLink } from '@/components';
import { logout } from '@/actions/auth';
import { getAuthUser } from '@/lib/getAuthUser';

export default async function Navigation() {
	const authUser = await getAuthUser();
	return (
		<nav>
			<NavLink label="Home" href="/" />
			<div>
				{authUser ? (
					<>
						<NavLink label="Dashboard" href="/dashboard" />
						<form action={logout}>
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
