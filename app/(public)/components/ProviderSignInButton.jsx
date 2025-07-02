"use client";
import { useSearchParams } from "next/navigation";
import { capitalize } from "@utils/helpers";
import { PAGE_ROUTE_DASHBOARD } from "@utils/pageRoutes";
import { signIn } from "next-auth/react";

export default function ProviderSignInButton({ provider }) {
  const searchParams = useSearchParams();
  const redirectTo = searchParams.get("redirectTo");
  const callbackUrl = redirectTo ?? PAGE_ROUTE_DASHBOARD;

  return (
    <button
      onClick={() => signIn(provider.id, { callbackUrl })}
      className="flex flex-row justify-center items-center gap-3 h-[40px] w-full border border-solid border-gray-400 rounded p-2 hover:bg-gray-50">
      {
        <img
          src={`/assets/icons/${provider.id}.svg`}
          className="h-full pointer-events-none"
          alt={provider.id}
        />
      }

      {<p>Sign in with {capitalize(provider.id)}</p>}
    </button>
  );
}
