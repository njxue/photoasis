import prisma from "@prisma/prisma";
import NextAuth from "next-auth/next";
import GoogleProvider from "next-auth/providers/google";
import { revalidatePath } from "next/cache";

const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
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
    async signIn({ profile }) {
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
