import { b2GetUploadUrl } from "@actions/b2";
import imageCompression from "browser-image-compression";
import updateCollection from "@actions/updateCollection";

const formUploadPhotos = async (cid, uid, formdata, onComplete) => {
  let files = formdata.getAll("photos");
  const aperture = formdata.getAll("aperture");
  const shutterspeed = formdata.getAll("shutterspeed");
  const iso = formdata.getAll("iso");

  files = files.map(async (file, i) => {
    const { url, token } = await b2GetUploadUrl();
    const compressed = await imageCompression(file, {
      maxSizeMB: 0.5,
    });
    return new Promise((resolve, reject) => {
      resolve({
        name: file.name,
        compressed,
        url,
        token,
        aperture: aperture[i],
        shutterspeed: shutterspeed[i],
        iso: iso[i],
      });
    });
  });
  files = await Promise.all(files);

  // Delegate workers to perform parallel fetch
  const chunkSize = 1; // Number of fetch requests per worker
  let numChunks = Math.ceil(files.length / chunkSize);
  let completed = 0;
  let fileInfos = [];

  for (let i = 0; i < files.length; i += chunkSize) {
    const chunk = files.slice(i, i + chunkSize);
    const worker = new Worker("worker.js");
    worker.postMessage({ chunk, uid, cid });
    worker.onmessage = async (e) => {
      const res = e.data;
      const fileInfo = res.data;
      fileInfos = fileInfos.concat(fileInfo);
      completed++;
      worker.terminate();
      if (completed === numChunks) {
        const res = await updateCollection({
          cid,
          photos: fileInfos,
        });
        if (res.status === 200) {
          onComplete && onComplete();
        }
      }
    };
  }
};

export default formUploadPhotos;
