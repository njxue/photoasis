"use client";

import React from "react";
import { SessionProvider } from "next-auth/react";
import { PostHogProvider } from "./PosthogProvider";
const Provider = ({ children, session }) => {
  if (process.env.NEXT_PUBLIC_ENABLE_TRACKING === "true") {
    return (
      <PostHogProvider>
        <SessionProvider session={session}>{children}</SessionProvider>
      </PostHogProvider>
    );
  }
  return <SessionProvider session={session}>{children}</SessionProvider>;
};

export default Provider;
