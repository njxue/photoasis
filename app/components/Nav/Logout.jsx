"use client";

import { signOut } from "next-auth/react";

const Logout = () => {
  return (
    <button onClick={() => signOut({ callbackUrl: "/" })}>
      <img width={30} src="/assets/icons/logout.svg" alt="logout" />
    </button>
  );
};

export default Logout;
