"use client";

import { signOut } from "next-auth/react";

const Logout = () => {
  return (
    <button onClick={signOut}>
      <img width={30} src="/assets/icons/logout.svg" />
    </button>
  );
};

export default Logout;
