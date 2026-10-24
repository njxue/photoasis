"use server";

import setAlbumsArchived from "./utils/setAlbumsArchived";

async function unarchiveAlbums(albumIds) {
  return setAlbumsArchived(albumIds, false);
}

export default unarchiveAlbums;
