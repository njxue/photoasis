import { b2GetUploadUrls } from "@actions/b2";
const formUploadPhotos = async (aid, uid, formdata) => {
  return new Promise((resolve, reject) => {
    (async () => {
      try {
        let fileList = formdata.getAll("photos");
        fileList = [...fileList];
        const aperture = formdata.getAll("aperture");
        const shutterspeed = formdata.getAll("shutterspeed");
        const iso = formdata.getAll("iso");
        const description = formdata.getAll("description");
        const date = formdata.getAll("date");

        const uploadUrlsAndTokens = await b2GetUploadUrls(fileList.length);
        let files = fileList.map((file, i) => ({
          compressed: file,
          name: file.name,
          b2name: `${uid}/${aid}/${encodeURIComponent(file.name)}`,
          url: uploadUrlsAndTokens[i].url,
          token: uploadUrlsAndTokens[i].token,
          idx: i,
        }));

        // Upload
        let uploadedFileIds = await uploadFiles(files);

        // Assign photo settings
        const uploadedFiles = uploadedFileIds.map((file) => ({
          name: fileList[file.idx].name,
          aperture: aperture[file.idx],
          shutterspeed: shutterspeed[file.idx],
          iso: iso[file.idx],
          description: description[file.idx],
          date: date[file.idx],
          fileId: file.fileId,
        }));

        resolve(uploadedFiles);
      } catch (err) {
        reject(err);
      }
    })();
  });
};

const uploadFiles = async (files) => {
  return await Promise.all(files.map(uploadFile));
};

const uploadFile = async (file) => {
  const res = await fetch(file.url, {
    method: "POST",
    headers: {
      Authorization: file.token,
      "X-Bz-File-Name": file.b2name,
      "Content-Type": "b2/x-auto",
      "X-Bz-Content-Sha1": "do_not_verify",
    },
    body: file.compressed,
  });
  const data = await res.json();
  return {
    fileId: data.fileId,
    idx: file.idx,
  };
};

export default formUploadPhotos;
