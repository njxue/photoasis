export const buildPhotoUrl = ({ uid, aid, name }) => {
  const baseUrl = process.env.NEXT_PUBLIC_CLOUDFLARE_URL?.replace(/\/$/, "");

  if (!baseUrl || uid == null || aid == null || !name) {
    return undefined;
  }

  return `${baseUrl}/${encodeURIComponent(uid)}/${encodeURIComponent(aid)}/${encodeURIComponent(name)}`;
};
