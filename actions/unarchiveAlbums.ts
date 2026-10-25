"use server";

import setAlbumsArchived from "./utils/setAlbumsArchived";
import type { EntityId } from "@actions/types";

async function unarchiveAlbums(albumIds: EntityId[]) {
  return setAlbumsArchived(albumIds, false);
}

export default unarchiveAlbums;
