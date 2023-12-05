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

const b2GetUploadUrls = async (num) => {
  if (!b2) {
    b2 = new BackBlazeB2({
      applicationKey: process.env.BACKBLAZE_APP_KEY,
      applicationKeyId: process.env.BACKBLAZE_KEY_ID,
    });
    await b2.authorize();
  }
  const requests = [];
  for (let i = 0; i < num; i++) {
    requests.push(
      b2.getUploadUrl({
        bucketId: process.env.BACKBLAZE_BUCKET_ID,
      })
    );
  }
  const urls = await Promise.all(requests);
  return urls.map((url) => ({
    url: url.data.uploadUrl,
    token: url.data.authorizationToken,
  }));
};

export { b2GetUploadUrl, b2GetUploadUrls };
