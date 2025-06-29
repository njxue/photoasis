import { signOut } from "next-auth/react";

const Logout = () => {
  return (
    <button
      onClick={() => signOut({ callbackUrl: "/" })}
      className="flex items-center gap-2 w-full">
      <img width={22} src="/assets/icons/logout.svg" alt="logout" />
      <p className="font-semibold text-red-500 text-sm">Logout</p>
    </button>
  );
};

export default Logout;
