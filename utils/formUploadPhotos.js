import { b2GetUploadUrl } from "@actions/b2";
import compress from "./compress";

const formUploadPhotos = async (aid, uid, formdata) => {
  return new Promise((resolve, reject) => {
    (async () => {
      let fileList = formdata.getAll("photos");
      const aperture = formdata.getAll("aperture");
      const shutterspeed = formdata.getAll("shutterspeed");
      const iso = formdata.getAll("iso");

      // Compress
      const compressedFiles = await compress([...fileList]); // fileList is a FileList object, not array

      // Prepare for upload
      let files = compressedFiles.map(async (file, i) => {
        const { url, token } = await b2GetUploadUrl();
        return {
          name: fileList[i].name,
          compressed: file,
          url,
          token,
          aperture: aperture[i],
          shutterspeed: shutterspeed[i],
          iso: iso[i],
        };
      });

      files = await Promise.all(files);

      // Delegate workers to perform parallel upload
      const chunkSize = 1; // Number of fetch requests per worker
      let numChunks = Math.ceil(files.length / chunkSize);
      let completed = 0;
      let fileInfos = [];

      for (let i = 0; i < files.length; i += chunkSize) {
        const chunk = files.slice(i, i + chunkSize);
        const worker = new Worker("/worker.js");
        worker.postMessage({ chunk, uid, aid });
        worker.onmessage = async (e) => {
          const res = e.data;
          const fileInfo = res.data;
          fileInfos = fileInfos.concat(fileInfo);
          completed++;
          worker.terminate();
          if (completed === numChunks) {
            if (res.status === 200) {
              resolve(fileInfos);
            } else {
              reject();
            }
          }
        };
      }
    })();
  });
};

export default formUploadPhotos;
