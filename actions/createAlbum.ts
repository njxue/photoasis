"use server";

import type { Album } from "@/generated/prisma/client";
import { revalidatePath } from "next/cache";
import prisma from "@prisma/prisma";
import { requireUserId } from "@auth/requireUser";
import type { MutationResult } from "@actions/types";
import {
  createAlbumSlug,
  DUPLICATE_ALBUM_NAME_MESSAGE,
} from "@utils/albumSlug";
import { hasAlbumWithSlug } from "@actions/utils/hasAlbumWithSlug";

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

  const slug = createAlbumSlug(normalizedAlbumName);

  if (await hasAlbumWithSlug({ uid, slug })) {
    return {
      status: 409,
      message: DUPLICATE_ALBUM_NAME_MESSAGE,
      ok: false,
    };
  }

  try {
    const album = await prisma.album.create({
      data: {
        name: normalizedAlbumName,
        slug,
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
    try {
      // Still required to check here in case of race condition
      const hasSlugExists = await hasAlbumWithSlug({ uid, slug });
      if (hasSlugExists) {
        return {
          status: 409,
          message: DUPLICATE_ALBUM_NAME_MESSAGE,
          ok: false,
        };
      }
    } catch {
      // Preserve the original database error
    }

    throw error;
  }
}

export default createAlbum;
