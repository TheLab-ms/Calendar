import NextAuth, { NextAuthOptions } from 'next-auth';
import KeycloakProvider from 'next-auth/providers/keycloak';
import { prisma } from '@/helpers/db';
import md5 from 'md5';

const {
	KEYCLOAK_BASE_URL,
	KEYCLOAK_CLIENT_ID,
	KEYCLOAK_CLIENT_SECRET,
	KEYCLOAK_REALM,
} = process.env;

export const authOptions: NextAuthOptions = {
	providers: [
		KeycloakProvider({
			issuer: `${KEYCLOAK_BASE_URL}/realms/${KEYCLOAK_REALM}`,
			clientId: KEYCLOAK_CLIENT_ID,
			clientSecret: KEYCLOAK_CLIENT_SECRET,
			name: 'TheLab.ms',
		}),
	],
	theme: {
		colorScheme: 'light',
	},
	callbacks: {
		async signIn(params) {
			console.log(JSON.stringify(params, null, 2));
			// TODO: Store Discord ID in DB
			const { id, name, email } = params.user;
			if (!id || !name || !email) {
				// Something is wrong with the user object, don't allow signin
				return false;
			}
			// On signin create a Account or update it if it already exists (this allows users to update their info and have it updated on their next login)
			await prisma.account.upsert({
				where: { id },
				update: { email, name },
				create: { id, email, name },
			});
			return true;
		},
		async jwt({ token, user, profile }) {
			if (user && user.email && !token.picture) {
				const emailHash = md5(user.email, { encoding: 'binary' });
				token.picture = `https://www.gravatar.com/avatar/${emailHash}?d=mp`;
			}
			if (profile && profile.groups) {
				console.log('Adding groups to token');
				token.groups = profile?.groups || [];
			}
			if (user) {
				token.uid = user.id;
			}
			return token;
		},
		async session({ session, token }) {
			if (session?.user) {
				session.user.id = token.uid as string;
			}
			if (!session.user.groups) {
				session.user.groups = token.groups || [];
			}
			return session;
		},
	},
	// callbacks: {
	// 	async jwt({ token, user, profile }) {
	// 		console.log({
	// 			token,
	// 			user,
	// 			profile,
	// 		});
	// 		if (profile) {
	// 			token.username = profile?.preferred_username;
	// 			token.groups = profile?.groups.map((group) => group.replace('/', ''));
	// 		}
	// 		if (profile?.discord) {
	// 			token.discord = profile.discord;
	// 		}
	// 		return token;
	// 	},
	// 	async session({ session, token }) {
	// 		if (token.groups) {
	// 			session.user.groups = token.groups;
	// 		}
	// 		if (token.username) {
	// 			session.user.username = token.username;
	// 		}
	// 		if (token.discord) {
	// 			session.user.discord = token.discord;
	// 		}
	// 		session.user.image = '';
	// 		return session;
	// 	},
	// },
};

export default NextAuth(authOptions);
