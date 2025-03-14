"use client";

import React from "react";
import { SessionProvider } from "next-auth/react";
import { PostHogProvider } from "./PosthogProvider";
const Provider = ({ children, session }) => {
  return (
    <PostHogProvider>
      <SessionProvider session={session}>{children}</SessionProvider>
    </PostHogProvider>
  );
};

export default Provider;
