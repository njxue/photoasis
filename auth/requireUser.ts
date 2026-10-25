import { getServerSession } from "next-auth";
import { authOptions } from "./options";

export async function requireUserId(): Promise<number> {
  const session = await getServerSession(authOptions);
  const uid = Number(session?.user?.id);

  if (!Number.isSafeInteger(uid) || uid <= 0) {
    throw new Error("Please sign in");
  }

  return uid;
}
