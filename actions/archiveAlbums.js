"use server";

import setAlbumsArchived from "./utils/setAlbumsArchived";

async function archiveAlbums(albumIds) {
  return setAlbumsArchived(albumIds, true);
}

export default archiveAlbums;
