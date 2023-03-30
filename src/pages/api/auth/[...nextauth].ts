import NextAuth, { NextAuthOptions } from 'next-auth';
import KeycloakProvider from 'next-auth/providers/keycloak';

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
		async jwt({ token, user, profile }) {
			console.log({
				token,
				user,
				profile,
			});
			if (profile) {
				token.username = profile?.preferred_username;
				token.groups = profile?.groups.map((group) => group.replace('/', ''));
			}
			if (profile?.discord) {
				token.discord = profile.discord;
			}
			return token;
		},
		async session({ session, token }) {
			if (token.groups) {
				session.user.groups = token.groups;
			}
			if (token.username) {
				session.user.username = token.username;
			}
			if (token.discord) {
				session.user.discord = token.discord;
			}

			return session;
		},
	},
};

export default NextAuth(authOptions);
