import prisma from "@prisma/prisma";
import NextAuth from "next-auth/next";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";

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

        const isValidPassword = await bcrypt.compare(password, user.password);

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
    async session({ session, token }) {
      try {
        session.user.id = token.id;
      } catch (err) {
        console.log(err);
      }

      return session;
    },

    async jwt({ token, user, profile, account }) {
      // On sign in, add user id (from database) to token
      if (user) {
        if (account.provider === "google") {
          token.id = profile.dbUserId;
        } else {
          token.id = user.id;
        }
      }
      return token;
    },

    async signIn({ account, profile }) {
      if (account.provider !== "google") return true;

      try {
        // Create new user if register using google
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

        // To be accessed in jwt callback
        profile.dbUserId = user.id;

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
