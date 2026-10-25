"use server";

import BackBlazeB2, {
  type BackBlazeAuthorization,
} from "backblaze-b2";

export interface B2UploadTarget {
  url: string;
  token: string;
}

export type B2DownloadResult =
  | {
      ok: true;
      status: number;
      data: ReadableStream<Uint8Array>;
    }
  | {
      ok: false;
      message: string;
    };

let b2: BackBlazeB2 | undefined;
let authorization: BackBlazeAuthorization | undefined;

const b2Authorize = async (): Promise<BackBlazeAuthorization> => {
  if (!b2 || !authorization) {
    b2 = new BackBlazeB2({
      applicationKey: process.env.BACKBLAZE_APP_KEY!,
      applicationKeyId: process.env.BACKBLAZE_KEY_ID!,
    });
    const authResponse = await b2.authorize();
    authorization = authResponse.data;
  }

  return authorization;
};

const b2GetUploadUrl = async (): Promise<B2UploadTarget> => {
  await b2Authorize();
  const response = await b2!.getUploadUrl({
    bucketId: process.env.BACKBLAZE_BUCKET_ID!,
  });

  return {
    url: response.data.uploadUrl,
    token: response.data.authorizationToken,
  };
};

const b2GetUploadUrls = async (count: number): Promise<B2UploadTarget[]> => {
  await b2Authorize();
  const requests = Array.from({ length: count }, () =>
    b2!.getUploadUrl({
      bucketId: process.env.BACKBLAZE_BUCKET_ID!,
    }),
  );
  const responses = await Promise.all(requests);

  return responses.map((response) => ({
    url: response.data.uploadUrl,
    token: response.data.authorizationToken,
  }));
};

const b2DownloadFileById = async (
  fileId: string,
): Promise<B2DownloadResult> => {
  try {
    const auth = await b2Authorize();
    const response = await fetch(
      `${auth.downloadUrl}/b2api/v3/b2_download_file_by_id?fileId=${encodeURIComponent(fileId)}`,
      {
        method: "GET",
        headers: {
          Authorization: auth.authorizationToken,
        },
      },
    );

    if (!response.ok || !response.body) {
      throw new Error(`Failed to download file: ${fileId}`);
    }

    return {
      ok: true,
      status: response.status,
      data: response.body,
    };
  } catch (error) {
    console.error(error);
    return {
      ok: false,
      message: error instanceof Error ? error.message : String(error),
    };
  }
};

const b2GetDownloadUrl = async (
  uid: number,
  aid: number,
  fileName: string,
): Promise<string> => {
  const auth = await b2Authorize();
  const contentDisposition = "attachment";
  const downloadAuth = await b2!.getDownloadAuthorization({
    bucketId: process.env.BACKBLAZE_BUCKET_ID!,
    fileNamePrefix: `${uid}/${aid}/`,
    validDurationInSeconds: 60,
    b2ContentDisposition: contentDisposition,
  });
  const encodedFileName = encodeURIComponent(fileName);

  return `${auth.downloadUrl}/file/${process.env.NEXT_PUBLIC_BACKBLAZE_BUCKET_NAME}/${uid}/${aid}/${encodedFileName}?Authorization=${downloadAuth.data.authorizationToken}&b2ContentDisposition=${contentDisposition}`;
};

export {
  b2GetUploadUrl,
  b2GetUploadUrls,
  b2DownloadFileById,
  b2GetDownloadUrl,
};
