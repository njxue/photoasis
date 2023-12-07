"use server";
import BackBlazeB2 from "backblaze-b2";
let b2;
const b2GetUploadUrl = async () => {
  if (!b2) {
    b2 = new BackBlazeB2({
      applicationKey: process.env.BACKBLAZE_APP_KEY,
      applicationKeyId: process.env.BACKBLAZE_KEY_ID,
    });
    await b2.authorize();
  }

  const url = await b2.getUploadUrl({
    bucketId: process.env.BACKBLAZE_BUCKET_ID,
  });

  return { url: url.data.uploadUrl, token: url.data.authorizationToken };
};

export { b2GetUploadUrl };
