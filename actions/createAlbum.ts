"use server";

import type { Album } from "@prisma/client";
import { revalidatePath } from "next/cache";
import prisma from "@prisma/prisma";
import { requireUserId } from "@auth/requireUser";
import type { MutationResult } from "@actions/types";
import {
  createAlbumSlug,
  DUPLICATE_ALBUM_NAME_MESSAGE,
  isAlbumSlugConflict,
} from "@utils/albumSlug";

interface CreateAlbumInput {
  albumName: string;
}

async function createAlbum({
  albumName,
}: CreateAlbumInput): Promise<MutationResult<Album>> {
  const uid = await requireUserId();
  const normalizedAlbumName = albumName?.trim();

  if (!normalizedAlbumName) {
    return { status: 400, message: "Album name is required", ok: false };
  }

  try {
    const album = await prisma.album.create({
      data: {
        name: normalizedAlbumName,
        slug: createAlbumSlug(normalizedAlbumName),
        uid,
      },
    });

    revalidatePath("/", "layout");
    return {
      status: 200,
      message: "Successfully created album",
      data: album,
      ok: true,
    };
  } catch (error) {
    if (isAlbumSlugConflict(error)) {
      return {
        status: 409,
        message: DUPLICATE_ALBUM_NAME_MESSAGE,
        ok: false,
      };
    }

    throw error;
  }
}

export default createAlbum;
