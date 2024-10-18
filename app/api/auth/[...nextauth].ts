// app/api/auth/[...nextauth].ts
import NextAuth, { AuthOptions, User as NextAuthUser } from "next-auth"; // Import User as NextAuthUser
import CredentialsProvider from "next-auth/providers/credentials";
import GitHubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import axios from "axios";
import { mentorAPI } from "@/app/utilities/constants";

// Define the authOptions
export const authOptions: AuthOptions = {
	providers: [
		// GitHub OAuth Provider
		GitHubProvider({
			clientId: process.env.GITHUB_CLIENT_ID || "",
			clientSecret: process.env.GITHUB_CLIENT_SECRET || "",
		}),
		// Google OAuth Provider
		GoogleProvider({
			clientId: process.env.GOOGLE_CLIENT_ID || "",
			clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
		}),
		// Custom Credentials (email/password)
		CredentialsProvider({
			name: "Credentials",
			credentials: {
				email: { label: "Email", type: "email" },
				password: { label: "Password", type: "password" },
			},
			async authorize(credentials) {
				try {
					const response = await axios.post(
						`${mentorAPI}/auth/login`,
						{
							email: credentials?.email,
							password: credentials?.password,
						}
					);

					if (response.data.success) {
						// Use NextAuthUser to create a user object
						return {
							...response.data, // This should include accessToken and any other user properties
						} as NextAuthUser & { accessToken: string }; // Type assertion here
					}
				} catch (error) {
					console.error(error);
					throw new Error("Invalid credentials");
				}
				return null; // Return null if authorization fails
			},
		}),
	],
	callbacks: {
		async jwt({ token, user }) {
			if (user) {
				token.accessToken = user.accessToken; // Cast user to any to access accessToken
			}
			return token;
		},
		async session({ session, token }) {
			session.accessToken = token.accessToken as string; // TypeScript recognizes accessToken
			return session;
		},
	},
	pages: {
		signIn: "/auth/login",
		error: "/auth/error",
	},
	secret: process.env.NEXTAUTH_SECRET,
};

export default NextAuth(authOptions);
