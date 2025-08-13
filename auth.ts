import { PrismaAdapter } from "@auth/prisma-adapter";
import NextAuth from "next-auth";
import prisma from "./lib/prisma";
import authConfig from "./auth.config";

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: PrismaAdapter(prisma),
  session: { strategy: "jwt" },
  callbacks: {
    signIn: async (token) => {
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
  ...authConfig,
});
