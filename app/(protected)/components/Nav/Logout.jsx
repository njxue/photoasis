import { signOut } from "next-auth/react";

const Logout = () => {
  return (
    <button
      onClick={() => signOut({ callbackUrl: "/" })}
      className="flex w-full items-center gap-2">
      <img width={22} src="/assets/icons/logout.svg" alt="logout" />
      <span className="text-xs font-semibold text-red-700">Log out</span>
    </button>
  );
};

export default Logout;
