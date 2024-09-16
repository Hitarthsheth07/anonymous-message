import "next-auth";

declare module "next-auth" {
  interface User {
    _id?: string;
    isVerified?: boolean;
    isAcceptingMessages?: boolean;
    username?: string;
    email?: string;
  }
  interface Session {
    user: {
      _id?: string;
      isVerified?: boolean;
      isAcceptingMessages?: boolean;
      username?: string;
      email?: string;
    }
    // Change in code, skipped '& DefaultSession["user"]' above
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    _id?: string;
    isVerified?: boolean;
    isAcceptingMessages?: boolean;
    username?: string;
    email?: string;
  }
}
