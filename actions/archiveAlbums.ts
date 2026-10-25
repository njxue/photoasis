"use server";

import setAlbumsArchived from "./utils/setAlbumsArchived";
import type { EntityId } from "@actions/types";

async function archiveAlbums(albumIds: EntityId[]) {
  return setAlbumsArchived(albumIds, true);
}

export default archiveAlbums;
