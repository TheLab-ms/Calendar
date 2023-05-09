import { withAuth } from 'next-auth/middleware';

export default withAuth({
	callbacks: {
		authorized({ req, token }) {
			if (req.nextUrl.pathname === '/events/create' && token?.groups) {
				return token?.groups.includes('Calendar Admin');
			}
			return !!token;
		},
	},
});

export const config = { matcher: ['/events/create'] };
