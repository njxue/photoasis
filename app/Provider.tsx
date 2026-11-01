"use client";

import { SessionProvider } from "next-auth/react";
import { PostHogProvider } from "./PosthogProvider";
import type { Session } from "next-auth";
import type { ReactNode } from "react";

interface ProviderProps {
  children: ReactNode;
  session?: Session | null;
}

const Provider = ({ children, session }: ProviderProps) => {
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
