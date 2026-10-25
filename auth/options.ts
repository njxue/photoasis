import type { NextAuthOptions } from "next-auth";
import NextAuthCredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import bcrypt from "bcryptjs";
import prisma from "@prisma/prisma";

export const authOptions: NextAuthOptions = {
  pages: {
    signIn: "/login",
  },
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID ?? "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? "",
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
        },
      },
    }),
    NextAuthCredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const email = credentials?.email;
        const password = credentials?.password;

        if (!email || !password) {
          return null;
        }

        const user = await prisma.user.findUnique({ where: { email } });

        if (!user?.password || !user.isVerified) {
          return null;
        }

        const isValidPassword = await bcrypt.compare(password, user.password);

        if (!isValidPassword) {
          return null;
        }

        return {
          id: String(user.id),
          email: user.email,
          name: user.name,
          image: user.image,
        };
      },
    }),
  ],
  callbacks: {
    async session({ session, token }) {
      if (session.user && typeof token.id === "number") {
        session.user.id = token.id;
      }

      return session;
    },

    async jwt({ token, user, account }) {
      if (!user) {
        return token;
      }

      let id = Number(user.id);

      if (account?.provider === "google" && user.email) {
        const databaseUser = await prisma.user.findUnique({
          where: { email: user.email },
          select: { id: true },
        });
        id = databaseUser?.id ?? Number.NaN;
      }

      if (Number.isSafeInteger(id)) {
        token.id = id;
      }

      return token;
    },

    async signIn({ account, profile }) {
      if (account?.provider !== "google") {
        return true;
      }

      if (!profile?.email) {
        return false;
      }

      try {
        // Create new user if register using google
        let user = await prisma.user.findUnique({
          where: { email: profile.email },
        });

        if (!user) {
          user = await prisma.user.create({
            data: {
              email: profile.email,
              name: profile.name ?? profile.email,
              image: profile.image,
            },
          });
        }
        return true;
      } catch (error) {
        console.error(error);
        return false;
      }
    },
  },
};
