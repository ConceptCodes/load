import { type GetServerSidePropsContext } from "next";
import {
  getServerSession,
  type NextAuthOptions,
  type DefaultSession,
} from "next-auth";
import EmailProvider from "next-auth/providers/email";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import type { Role } from "@prisma/client";
import { Resend } from "resend";

import { env } from "@/env.mjs";
import { prisma } from "@/server/db";
import { MagicLinkEmail } from "@/emails/magic-link";

/**
 * Module augmentation for `next-auth` types. Allows us to add custom properties to the `session`
 * object and keep type safety.
 *
 * @see https://next-auth.js.org/getting-started/typescript#module-augmentation
 */
declare module "next-auth" {
  interface Session extends DefaultSession {
    user: {
      id: string;
      role: Role;
    } & DefaultSession["user"];
  }
}

/**
 * Options for NextAuth.js used to configure adapters, providers, callbacks, etc.
 *
 * @see https://next-auth.js.org/configuration/options
 */
export const authOptions: NextAuthOptions = {
  callbacks: {
    session({ session }) {
      return session;
    },
  },
  adapter: PrismaAdapter(prisma),
  providers: [
    EmailProvider({
      from: env.EMAIL_FROM,
      async sendVerificationRequest({ identifier: email, url }) {
        try {
          const resend = new Resend(env.RESEND_API_KEY);
          await resend.emails.send({
            from: env.EMAIL_FROM,
            to: email,
            subject: "Sign in to your account",
            react: MagicLinkEmail({ url }),
          });
        } catch (error) {
          console.error("SEND_VERIFICATION_EMAIL_ERROR", error);
        }
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  jwt: {
    maxAge: 7 * 24 * 60 * 60, // 1 week
  },
  secret: env.NEXTAUTH_SECRET,
  pages: {
    verifyRequest: "/auth/verify-request",
    error: "/auth/error",
    signIn: "/",
  },
  debug: env.NODE_ENV === "development",
};

/**
 * Wrapper for `getServerSession` so that you don't need to import the `authOptions` in every file.
 *
 * @see https://next-auth.js.org/configuration/nextjs
 */
export const getServerAuthSession = (ctx: {
  req: GetServerSidePropsContext["req"];
  res: GetServerSidePropsContext["res"];
}) => {
  return getServerSession(ctx.req, ctx.res, authOptions);
};
