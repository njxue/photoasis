import { b2GetUploadUrl } from "@actions/b2";
import { compressMany } from "./compress";

const formUploadPhotos = async (aid, uid, formdata) => {
  return new Promise((resolve, reject) => {
    (async () => {
      try {
        let fileList = formdata.getAll("photos");
        const aperture = formdata.getAll("aperture");
        const shutterspeed = formdata.getAll("shutterspeed");
        const iso = formdata.getAll("iso");

        // Compress
        const compressedFiles = await compressMany([...fileList]); // fileList is a FileList object, not array

        // Prepare for upload
        let files = await getUploadTokens(compressedFiles);

        // Upload with workers
        let uploadedFileIds = await uploadPhotosWithWorkers({
          files,
          uid,
          aid,
        });

        // Assign photo settings
        const uploadedFiles = uploadedFileIds.map((file) => ({
          name: fileList[file.idx].name,
          aperture: aperture[file.idx],
          shutterspeed: shutterspeed[file.idx],
          iso: iso[file.idx],
          fileId: file.fileId,
        }));

        resolve(uploadedFiles);
      } catch (err) {
        reject(err);
      }
    })();
  });
};

const getUploadTokens = async (compressedFiles) => {
  let files = compressedFiles.map(async (file, i) => {
    const { url, token } = await b2GetUploadUrl();
    return {
      compressed: file,
      name: file.name,
      url,
      token,
      idx: i,
    };
  });
  files = await Promise.all(files);
  return files;
};

const uploadPhotosWithWorkers = ({ files, uid, aid }) => {
  return new Promise((resolve, reject) => {
    const chunkSize = 10; // Number of fetch requests per worker
    let numChunks = Math.ceil(files.length / chunkSize);
    let completed = 0;
    let uploadedFileIds = [];

    for (let i = 0; i < files.length; i += chunkSize) {
      const chunk = files.slice(i, i + chunkSize);
      const worker = new Worker("/worker.js");
      worker.postMessage({ chunk, uid, aid });
      worker.onmessage = async (e) => {
        const res = e.data;
        const fileId = res.data; // { fileId, idx }
        uploadedFileIds = uploadedFileIds.concat(fileId);
        completed++;
        worker.terminate();
        if (completed === numChunks) {
          if (res.status === 200) {
            resolve(uploadedFileIds);
          } else {
            reject();
          }
        }
      };
    }
  });
};
export default formUploadPhotos;
