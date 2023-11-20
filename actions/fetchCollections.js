"use server";
import BackBlazeB2 from "backblaze-b2";
export default async function fetchCollections(req) {
  try {
    const b2 = new BackBlazeB2({
      applicationKey: process.env.BACKBLAZE_APP_KEY,
      applicationKeyId: process.env.BACKBLAZE_KEY_ID,
    });
    await b2.authorize();

    //const base64 = res.data.toString("base64");
    //const imgsrc = `data:image/jpg;base64,${base64}`;
    return {
      image: "https://cloudflare-b2.ngjxue.workers.dev/1/DSC_0615.jpg",
      status: 200,
    };
  } catch (err) {
    return { status: 500 };
  }
}
