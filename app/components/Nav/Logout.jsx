"use client";

import { signOut } from "next-auth/react";

const Logout = () => {
  return (
    <button onClick={() => signOut({ callbackUrl: "/" })}>
      <img width={30} src="/assets/icons/logout.svg" />
    </button>
  );
};

export default Logout;
