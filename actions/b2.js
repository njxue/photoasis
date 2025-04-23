"use server";
import BackBlazeB2 from "backblaze-b2";
let b2;

const b2Authorize = async () => {
  if (!b2) {
    b2 = new BackBlazeB2({
      applicationKey: process.env.BACKBLAZE_APP_KEY,
      applicationKeyId: process.env.BACKBLAZE_KEY_ID,
    });
    const authRes = await b2.authorize();
    return authRes?.data;
  }
  return b2;
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

const b2DownloadFileById = async (fileId) => {
  try {
    await b2Authorize();

    const res = await b2.downloadFileById({
      fileId,
      responseType: "arraybuffer",
    });

    const data = res.data;
    const mimeType = res.headers["content-type"];
    const buf = Buffer.from(data);
    const base64 = buf.toString("base64");
    return {
      status: res.status,
      message: "Successfully downloaded",
      data: { content: base64, mimeType },
      ok: true,
    };
  } catch (err) {
    console.log(err.message);
    return {
      status: err.response.status,
      message: err.message,
      ok: false,
    };
  }
};

// https://www.backblaze.com/apidocs/b2-download-file-by-name
const b2GetDownloadUrl = async (uid, aid, fileName) => {
  const auth = await b2Authorize();
  const contentDisposition = "attachment";
  const downloadAuth = await b2.getDownloadAuthorization({
    bucketId: process.env.BACKBLAZE_BUCKET_ID,
    fileNamePrefix: `${uid}/${aid}/`,
    validDurationInSeconds: 60,
    b2ContentDisposition: contentDisposition,
  });
  const baseDownloadUrl = auth?.downloadUrl;
  const fullDownloadUrl = `${baseDownloadUrl}/file/${process.env.NEXT_PUBLIC_BACKBLAZE_BUCKET_NAME}/${uid}/${aid}/${fileName}?Authorization=${downloadAuth?.data?.authorizationToken}&b2ContentDisposition=${contentDisposition}`;
  return fullDownloadUrl;
};

export {
  b2GetUploadUrl,
  b2GetUploadUrls,
  b2DownloadFileById,
  b2GetDownloadUrl,
};
