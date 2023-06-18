import { withAuth } from 'next-auth/middleware';
import { getRoleByGroup } from './helpers/role';
import { UserRoles } from './interfaces/roles';

export default withAuth({
	callbacks: {
		authorized({ req, token }) {
			if (!token || !token.groups) return false;
			const role = getRoleByGroup(token.groups);
			if (role === UserRoles.ADMIN) {
				return true;
			}
			if (
				req.nextUrl.pathname === '/create/queue' &&
				role === UserRoles.APPROVE_EVENT
			) {
				return true;
			}

			if (
				(req.nextUrl.pathname === '/events/create' &&
					role === UserRoles.CREATE_EVENT) ||
				role === UserRoles.APPROVE_EVENT
			) {
				return true;
			}

			return false;
		},
	},
});

export const config = {
	matcher: ['/events/create', '/admin', '/events/queue'],
};
