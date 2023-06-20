import { withAuth } from 'next-auth/middleware';
import { getRoleByGroup } from './helpers/role';
import { UserRoles } from './interfaces/roles';

export default withAuth({
	callbacks: {
		authorized({ req, token }) {
			if (!token || !token.groups) {
				console.log('no token or groups');
				return false;
			}
			const role = getRoleByGroup(token.groups);
			console.log('Role: ', role);
			if (role === UserRoles.ADMIN) {
				console.log('Admitting because the user is an admin');
				return true;
			}
			if (
				req.nextUrl.pathname === '/create/queue' &&
				role === UserRoles.APPROVE_EVENT
			) {
				console.log('Admitting because the user is an approver');
				return true;
			}

			if (
				(req.nextUrl.pathname === '/events/create' &&
					role === UserRoles.CREATE_EVENT) ||
				role === UserRoles.APPROVE_EVENT
			) {
				console.log('Admitting because the user is an approver or creator');
				return true;
			}
			console.log('No match');
			return false;
		},
	},
});

export const config = {
	matcher: ['/events/create', '/admin', '/events/queue'],
};
