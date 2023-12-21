"use server";
import BackBlazeB2 from "backblaze-b2";
let b2;

const b2Authorize = async () => {
  if (!b2) {
    b2 = new BackBlazeB2({
      applicationKey: process.env.BACKBLAZE_APP_KEY,
      applicationKeyId: process.env.BACKBLAZE_KEY_ID,
    });
    await b2.authorize();
  }
};
const b2GetUploadUrl = async () => {
  await b2Authorize();
  const url = await b2.getUploadUrl({
    bucketId: process.env.BACKBLAZE_BUCKET_ID,
  });

  return { url: url.data.uploadUrl, token: url.data.authorizationToken };
};

const b2GetUploadUrls = async (num) => {
  await b2Authorize();
  const requests = [];
  for (let i = 0; i < num; i++) {
    requests.push(
      b2.getUploadUrl({
        bucketId: process.env.BACKBLAZE_BUCKET_ID,
      })
    );
  }
  const responses = await Promise.all(requests);
  return responses.map((res) => ({
    url: res.data.uploadUrl,
    token: res.data.authorizationToken,
  }));
};

export { b2GetUploadUrl, b2GetUploadUrls };
