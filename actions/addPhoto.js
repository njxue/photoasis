"use server";

import BackBlazeB2 from "backblaze-b2";

export default async function addPhoto(formData, userId) {
  try {
    const file = formData.get("photo");
    const buffer = Buffer.from(await file.arrayBuffer());
    const b2 = new BackBlazeB2({
      applicationKey: process.env.BACKBLAZE_APP_KEY,
      applicationKeyId: process.env.BACKBLAZE_KEY_ID,
    });
    await b2.authorize();
    const res = await b2.getUploadUrl({
      bucketId: process.env.BACKBLAZE_BUCKET_ID,
    });

    const r = await b2.uploadFile({
      uploadUrl: res.data.uploadUrl,
      uploadAuthToken: res.data.authorizationToken,
      fileName: `${userId}/${file.name}`,
      data: buffer,
    });
    return { status: r.status, success: true };
  } catch (err) {
    return { status: 500, success: false };
  }
}
