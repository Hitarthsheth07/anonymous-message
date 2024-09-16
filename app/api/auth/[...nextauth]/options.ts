import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";
import UserModel from "@/models/User";
import dbconnect from "@/lib/dbconnect";
import { Session, User } from "next-auth";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      id: "credentials",
      name: "Credentials",
      credentials: {
        email: {
          label: "Email",
          type: "text",
          placeholder: "Username or Email",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials: any): Promise<any> {
        await dbconnect();
        try {
          const user = await UserModel.findOne({
            $or: [
              { email: credentials.identifier },
              // TODO: No username field in credentials param
              { username: credentials.identifier },
            ],
          });

          if (!user) {
            console.log(`user not found`)
            throw new Error("User not found");
          }

          if (!user.isVerified) {
            throw new Error("Please verify account first!");
          }

          // console.log(`password in DB: ${user.password}`)
          // console.log(`password by user: ${credentials.password}`)
          const isPasswordCorrect = await bcrypt.compare(
            credentials.password,
            user.password
          );
          console.log(`isPasswordCorrect: ${isPasswordCorrect}`)

          if (isPasswordCorrect) {
            return user
          }else{
            throw new Error('Incorrect password!')
          }
        } catch (err: any) {
          throw new Error(err);
        }
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token._id = user._id?.toString();
        token.isVerified = user.isVerified;
        token.isAcceptingMessages = user.isAcceptingMessages;
        token.username = user.username;
        token.email = user.email
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user._id = token._id;
        session.user.isVerified = token.isVerified;
        session.user.isAcceptingMessages = token.isAcceptingMessages;
        session.user.username = token.username;
        session.user.email = token.email;
      }
      return session;
    },
  },
  pages: {
    signIn: "sign-in",
  },
  session: {
    strategy: "jwt",
  },
};
