import type { NextAuthConfig, User } from "next-auth";
import MicrosoftEntraID from "next-auth/providers/microsoft-entra-id";
import CredentialsProvider from "next-auth/providers/credentials";

declare module "next-auth" {
  interface Session {
    provider?: string;
  }
}

export default {
  providers: [
    MicrosoftEntraID({
      clientId: process.env.AUTH_MICROSOFT_ENTRA_ID_ID!,
      clientSecret: process.env.AUTH_MICROSOFT_ENTRA_ID_SECRET!,
      issuer: process.env.AUTH_MICROSOFT_ENTRA_ID_ISSUER!,
    }),
    CredentialsProvider({
      credentials: {
        email: {
          label: "Email",
          type: "text",
          placeholder: "yourname@cedarville.edu",
        },
      },
      async authorize(credentials) {
        const email = credentials?.email as string | undefined;
        if (email && email.endsWith("@cedarville.edu")) {
          return { email: email, id: email } as User;
        }
        return null;
      },
    }),
  ],
  callbacks: {
    jwt: async ({ token, user, account }) => {
      if (user) {
        token.id = user.id;
        token.provider = account?.provider;
      }
      return token;
    },
    session: async ({ session, token }) => {
      session.provider = token.provider as string;
      return session;
    },
  },
} satisfies NextAuthConfig;
