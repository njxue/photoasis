interface PhotoUrlParts {
  uid: number | string | null | undefined;
  aid: number | string | null | undefined;
  name: string | null | undefined;
}

export const buildPhotoUrl = ({
  uid,
  aid,
  name,
}: PhotoUrlParts): string | undefined => {
  const baseUrl = process.env.NEXT_PUBLIC_CLOUDFLARE_URL?.replace(/\/$/, "");

  if (!baseUrl || uid == null || aid == null || !name) {
    return undefined;
  }

  return `${baseUrl}/${encodeURIComponent(uid)}/${encodeURIComponent(aid)}/${encodeURIComponent(name)}`;
};
