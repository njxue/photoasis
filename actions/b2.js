"use server";
import BackBlazeB2 from "backblaze-b2";
let b2;

const b2Authorize = async () => {
  if (!b2?.authorizationToken) {
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
    const auth = await b2Authorize();
    const { downloadUrl, authorizationToken } = auth;

    const res = await fetch(
      `${downloadUrl}/b2api/v3/b2_download_file_by_id?fileId=${fileId}`,
      {
        method: "GET",
        headers: {
          Authorization: authorizationToken,
        },
      }
    );

    if (!res.ok) {
      throw new Error(`Failed to download file: ${fileId}`);
    }
    return {
      ok: true,
      status: res.status,
      data: res.body,
    };
  } catch (err) {
    console.log(err);
    return {
      ok: false,
      message: err.message,
    };
  }
};

// https://www.backblaze.com/apidocs/b2-download-file-by-name
const b2GetDownloadUrl = async (uid, aid, fileName) => {
  const auth = await b2Authorize();
  if (!auth) {
    throw new Error("Not authorised");
  }
  const contentDisposition = "attachment";
  const downloadAuth = await b2.getDownloadAuthorization({
    bucketId: process.env.BACKBLAZE_BUCKET_ID,
    fileNamePrefix: `${uid}/${aid}/`,
    validDurationInSeconds: 60,
    b2ContentDisposition: contentDisposition,
  });
  if (!downloadAuth?.data) {
    throw new Error("Not authorised");
  }
  const baseDownloadUrl = auth.downloadUrl;
  const fullDownloadUrl = `${baseDownloadUrl}/file/${process.env.NEXT_PUBLIC_BACKBLAZE_BUCKET_NAME}/${uid}/${aid}/${fileName}?Authorization=${downloadAuth.data.authorizationToken}&b2ContentDisposition=${contentDisposition}`;
  return fullDownloadUrl;
};

export {
  b2GetUploadUrl,
  b2GetUploadUrls,
  b2DownloadFileById,
  b2GetDownloadUrl,
};
