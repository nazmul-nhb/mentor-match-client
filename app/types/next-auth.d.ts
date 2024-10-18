// types/next-auth.d.ts
import { DefaultUser } from "next-auth";

declare module "next-auth" {
	// Extending the User type to include accessToken
	interface User extends DefaultUser {
		accessToken: string; // Add any other properties as needed
	}

	// Extending the Session type to include accessToken
	interface Session {
		accessToken: string;
	}

	// Extending the JWT type to include accessToken
	interface JWT {
		accessToken: string;
	}
}
