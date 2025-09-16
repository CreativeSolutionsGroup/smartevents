import { PrismaAdapter } from "@auth/prisma-adapter";
import NextAuth, { User } from "next-auth";
import prisma from "./lib/prisma";
import authConfig from "./auth.config";
import CredentialsProvider from "next-auth/providers/credentials";

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: PrismaAdapter(prisma),
  ...authConfig,
  providers: [
    ...authConfig.providers,
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
        if (email && email.trim().endsWith("@cedarville.edu")) {
          await prisma.authorizedUser.upsert({
            where: { email },
            update: {},
            create: {
              email,
            },
          });
          return { email, id: email } as User;
        }
        return null;
      },
    }),
  ],
  session: { strategy: "jwt" },
  callbacks: {
    ...authConfig.callbacks,
    signIn: async (token) => {
      if (token.account?.provider === "credentials") {
        if (
          token.user.email &&
          token.user.email.trim().endsWith("@cedarville.edu")
        ) {
          return true;
        }
        return false;
      }

      if (token.user.email && token.user.email.endsWith("@cedarville.edu")) {
        const userInfo = await prisma.user.findUnique({
          where: { email: token.user.email },
        });
        if (userInfo) {
          await prisma.authorizedUser.upsert({
            where: { email: token.user.email },
            update: {
              user: { connect: { id: userInfo.id } },
            },
            create: {
              email: token.user.email,
              user: { connect: { id: userInfo.id } },
            },
          });
        }
        return true;
      }
      return false;
    },
  },
});
