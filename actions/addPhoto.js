"use server";

import BackBlazeB2 from "backblaze-b2";
import sharp from "sharp";
export default async function addPhoto(formData, userId) {
  try {
    for (var file of formData.values()) {
      const buffer = Buffer.from(await file.arrayBuffer());
      const compressedBuffer = await sharp(buffer)
        .jpeg({ quality: 30, progressive: true })
        .toBuffer();

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
        data: compressedBuffer,
      });
    }

    /** 
    const buffer = Buffer.from(await file.arrayBuffer());
    const compressedBuffer = await sharp(buffer)
      .jpeg({ quality: 30, progressive: true })
      .toBuffer();

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
      data: compressedBuffer,
    });
*/
    return {
      image: "https://f005.backblazeb2.com/file/NextPhotoVault/1/DSC_0814.jpg",
    };
  } catch (err) {
    console.log(err);
    return { status: 500, success: false };
  }
}
