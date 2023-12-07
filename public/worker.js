onmessage = async (e) => {
  const { chunk, uid, cid } = e.data;

  const requests = chunk.map((file) => {
    return fetch(file.url, {
      method: "POST",
      headers: {
        Authorization: file.token,
        "X-Bz-File-Name": `${uid}/${cid}/${encodeURIComponent(file.name)}`,
        "Content-Type": "b2/x-auto",
        "X-Bz-Content-Sha1": "do_not_verify",
      },
      body: file.compressed,
    }).catch((err) => Promise.reject(err));
  });

  try {
    const res = await Promise.all(requests);
    const fileInfos = await Promise.all(res.map((r) => r.json()));

    postMessage({
      status: 200,
      data: chunk.map((file, i) => ({
        name: file.name,
        fileId: fileInfos[i].fileId,
        aperture: file.aperture,
        shutterspeed: file.shutterspeed,
        iso: file.iso,
      })),
    });
  } catch (err) {
    console.log(err);
    postMessage({ status: 404, data: err });
  }
};
