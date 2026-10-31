export async function fetchPhotos(cursor) {
  const searchParams = new URLSearchParams();

  if (cursor != null) {
    searchParams.set("cursor", cursor);
  }

  const query = searchParams.size > 0 ? `?${searchParams}` : "";
  const response = await fetch(`/api/gallery${query}`);

  if (!response.ok) {
    throw new Error("Unable to fetch photos");
  }

  return response.json();
}
