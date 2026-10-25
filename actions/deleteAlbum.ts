"use server";
import deleteAlbums from "./deleteAlbums";
import type { EntityId } from "@actions/types";

async function deleteAlbum(aid: EntityId) {
  const res = await deleteAlbums([aid]);
  return res;
}

export default deleteAlbum;
