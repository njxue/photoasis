import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "@auth/options";
import { getPhotos } from "./getPhotos";

export async function GET(request) {
  try {
    const session = await getServerSession(authOptions);
    const uid = Number(session?.user?.id);

    if (!Number.isSafeInteger(uid) || uid <= 0) {
      return NextResponse.json(
        { error: "Authentication required" },
        { status: 401 },
      );
    }

    const cursor = request.nextUrl.searchParams.get("cursor") ?? undefined;
    const page = await getPhotos(uid, cursor);

    return NextResponse.json(page);
  } catch {
    return NextResponse.json(
      { error: "Unable to fetch photos" },
      { status: 500 },
    );
  }
}
