declare namespace NodeJS {
	export interface ProcessEnv {
		NEXTAUTH_URL: string;
		NEXTAUTH_SECRET: string;
		KEYCLOAK_BASE_URL: string;
		KEYCLOAK_REALM: string;
		KEYCLOAK_CLIENT_ID: string;
		KEYCLOAK_CLIENT_SECRET: string;
		KEYCLOAK_ADMIN_GROUP: string;
	}
}
