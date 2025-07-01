import prisma from "@prisma/prisma";
import NextAuth from "next-auth/next";
import GoogleProvider from "next-auth/providers/google";
import { revalidatePath } from "next/cache";
import CredentialsProvider from "next-auth/providers/credentials";

const authOptions = {
  pages: {
    signIn: "/login",
  },
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
        },
      },
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const { email, password } = credentials;
        const user = await prisma.user.findUnique({ where: { email } });

        // If password is empty, account was created using Google provider, not with credentials
        if (!user || !user.password) {
          return null;
        }

        const isValidPassword = true;

        if (!isValidPassword) {
          return null;
        }

        return {
          id: user.id,
          email: user.email,
          name: user.name,
          image: user.image,
        };
      },
    }),
  ],

  callbacks: {
    async session({ session }) {
      try {
        const user = await prisma.user.findUniqueOrThrow({
          where: { email: session.user.email },
        });
        session.user.id = user.id;
      } catch (err) {
        console.log(err);
      }

      return session;
    },
    async signIn({ account, profile }) {
      if (account.provider !== "google") return true;

      // Create new user if register using google
      try {
        let user = await prisma.user.findUnique({
          where: { email: profile.email },
        });

        if (!user) {
          user = await prisma.user.create({
            data: {
              email: profile.email,
              name: profile.name,
              image: profile.image,
            },
          });
        }
        revalidatePath("/", "layout");
        return true;
      } catch (err) {
        console.log(err);
        return false;
      }
    },
  },
};
const handler = NextAuth(authOptions);

export { handler as GET, handler as POST, authOptions };
