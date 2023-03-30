import 'next-auth/jwt';

// Read more at: https://next-auth.js.org/getting-started/typescript#module-augmentation

declare module 'next-auth/jwt' {
	interface JWT {
		discord?: string;
		username: string;
		groups: string[];
	}
}

declare module 'next-auth' {
	export interface Session {
		user: {
			email: any;
			name: any;
			id: string;
			discord: string;
			username: string;
			groups: string[];
			image?: string;
		};
	}

	export interface Profile {
		discord?: string;
		preferred_username: string;
		groups: string[];
	}
}
