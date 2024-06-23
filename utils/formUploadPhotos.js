import { b2GetUploadUrls } from "@actions/b2";
const formUploadPhotos = async (aid, uid, formdata) => {
  return new Promise((resolve, reject) => {
    (async () => {
      try {
        let fileList = formdata.getAll("photos").map((file, i) => ({
          file: file,
          idx: i,
          name: file.name,
        }));

        const aperture = formdata.getAll("aperture");
        const shutterspeed = formdata.getAll("shutterspeed");
        const iso = formdata.getAll("iso");
        const description = formdata.getAll("description");
        const date = formdata.getAll("date");
        const focalLength = formdata.getAll("focalLength");
        const meteringMode = formdata.getAll("meteringMode");
        const exposureMode = formdata.getAll("exposureMode");
        const lensModel = formdata.getAll("lensModel");
        const cameraModel = formdata.getAll("cameraModel");
        const editingSoftware = formdata.getAll("editingSoftware");

        const MAX_RETRIES = 5;
        let num_tries = 0;
        const successfullyUploadedFiles = [];
        while (fileList.length > 0 && num_tries < MAX_RETRIES) {
          if (process.env.NODE_ENV === "development") {
            console.log(
              `Attempt #${num_tries + 1} with ${fileList.length} files`
            );
          }

          const uploadUrlsAndTokens = await b2GetUploadUrls(fileList.length);
          let files = fileList.map((file, i) => ({
            ...file,
            b2name: `${uid}/${aid}/${encodeURIComponent(file.name)}`,
            url: uploadUrlsAndTokens[i].url,
            token: uploadUrlsAndTokens[i].token,
          }));

          // Attempt to upload
          let uploadedFileIds = await uploadFiles(files);

          // Success
          successfullyUploadedFiles.push(
            ...uploadedFileIds.filter((file) => file.status === 200)
          );

          // Failed
          fileList = uploadedFileIds.filter((file) => file.status === 503);
          num_tries++;
        }

        // Did not manage to upload all
        if (fileList.length > 0) {
          return resolve({
            status: 503,
            message:
              "Server experiencing high load. Please try again later, or upload your images in smaller batches",
          });
        }

        // Assign photo settings
        const uploadedFiles = successfullyUploadedFiles.map((file) => ({
          name: file.name,
          aperture: aperture[file.idx],
          shutterspeed: shutterspeed[file.idx],
          iso: iso[file.idx],
          description: description[file.idx],
          date: date[file.idx] ? date[file.idx] + "T00:00:00Z" : null,
          focalLength: focalLength[file.idx],
          meteringMode: meteringMode[file.idx],
          exposureMode: exposureMode[file.idx],
          lensModel: lensModel[file.idx],
          cameraModel: cameraModel[file.idx],
          editingSoftware: editingSoftware[file.idx],
          fileId: file.fileId,
        }));

        resolve({ status: 200, data: uploadedFiles });
      } catch (err) {
        reject({ status: 500, message: err });
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
    body: file.file,
  });
  const data = await res.json();
  return {
    ...file,
    fileId: data.fileId,
    status: res.status,
  };
};
export default formUploadPhotos;
