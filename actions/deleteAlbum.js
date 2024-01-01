"use server";
import deleteAlbums from "./deleteAlbums";

async function deleteAlbum(aid) {
  const res = await deleteAlbums([aid]);
  return res;
}

export default deleteAlbum;
