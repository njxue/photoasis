import Link from "next/link";
const Settings = () => {
  return (
    <Link href="/settings">
      <button onClick={() => {}} className="flex items-center gap-2 w-full">
        <img width={22} src="/assets/icons/settings.svg" alt="settings" />
        <p className="font-semibold text-sm">Settings</p>
      </button>
    </Link>
  );
};

export default Settings;
