import NextAuth, { NextAuthOptions } from 'next-auth';
import KeycloakProvider from 'next-auth/providers/keycloak';
import { prisma } from '@/helpers/db';

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
			// TODO: Store Discord ID in DB
			const { id, name, email } = params.user;
			if (!id || !name || !email) {
				// Something is wrong with the user object, don't allow signin
				return false;
			}
			// On signin create a Account or update it if it already exists (this allows users to update their info and have it updated on their next login)
			const result = await prisma.account.upsert({
				where: { id },
				update: { email, name },
				create: { id, email, name },
			});

			return true;
		},
		async jwt({ token, user, profile }) {
			// if (user && user.email && !token.picture) {
			// 	const emailHash = md5(user.email, { encoding: 'binary' });
			// 	token.picture = `https://www.gravatar.com/avatar/${emailHash}?d=mp`;
			// }
			if (profile && profile.groups) {
				token.groups = profile?.groups || [];
			}
			if (user) {
				token.uid = user.id;
			}
			if (profile?.discord) {
				token.discord = profile.discord;
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
			if (token.discord) {
				session.user.discord = token.discord;
			}
			return session;
		},
	},
};

export default NextAuth(authOptions);
