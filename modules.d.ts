declare namespace NodeJS {
	export interface ProcessEnv {
		NEXTAUTH_URL: string;
		NEXTAUTH_SECRET: string;
		KEYCLOAK_BASE_URL: string;
		KEYCLOAK_REALM: string;
		KEYCLOAK_CLIENT_ID: string;
		KEYCLOAK_CLIENT_SECRET: string;
		CREATE_EVENT_ROLE: string;
		APPROVE_EVENT_ROLE: string;
		ADMIN_ROLE: string;
	}
}
