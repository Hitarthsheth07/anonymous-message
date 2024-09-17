"use client";

import React from "react";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { User } from "next-auth";
import { Button } from "./ui/button";

const Navbar = () => {
  const { data: session } = useSession();
  return (
    <nav className="p-2 md:p-4 shadow-md">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items=center">
        <a href="/" className="text-xl mb-4 md:mb-0">
          Anonomous Message
        </a>
        {session ? (
          <>
            {/* TODO: Session has no email */}
            <span className="mr-4">Howdy hey! {session?.user.username}</span>
            <Button onClick={() => signOut()}>Logout</Button>
          </>
        ) : (
          <>
            <Link href="/sign-up">
              <Button className="w-full md:w-auto">Sign Up</Button>
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
