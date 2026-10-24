import prisma from "@prisma/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@app/api/auth/[...nextauth]/route";
import { revalidatePath } from "next/cache";

async function setAlbumsArchived(albumIds, archived) {
  const session = await getServerSession(authOptions);
  const uid = session?.user.id;
  const action = archived ? "archive" : "unarchive";
  const pastTenseAction = archived ? "archived" : "unarchived";

  if (uid == null) {
    return { status: 401, message: "Authentication error", ok: false };
  }

  if (!Array.isArray(albumIds) || albumIds.length === 0) {
    return { status: 400, message: "No albums selected", ok: false };
  }

  const normalizedAlbumIds = [...new Set(albumIds.map(Number))];
  const hasInvalidAlbumId = normalizedAlbumIds.some(
    (aid) => !Number.isSafeInteger(aid) || aid <= 0,
  );

  if (hasInvalidAlbumId) {
    return { status: 400, message: "Invalid album selection", ok: false };
  }

  try {
    const updatedAlbums = await prisma.album.updateMany({
      where: {
        aid: { in: normalizedAlbumIds },
        uid,
        archived: !archived,
      },
      data: { archived },
    });

    if (updatedAlbums.count === 0) {
      return {
        status: 404,
        message: `No albums were ${pastTenseAction}`,
        ok: false,
      };
    }

    revalidatePath("/dashboard");
    revalidatePath("/archive");

    return {
      status: 200,
      message: `Successfully ${pastTenseAction} albums`,
      ok: true,
      data: { count: updatedAlbums.count },
    };
  } catch (error) {
    console.error(error);
    return {
      status: 500,
      message: `Unable to ${action} albums`,
      ok: false,
    };
  }
}

export default setAlbumsArchived;
