onmessage = async (e) => {
  const { chunk, uid } = e.data;

  const requests = chunk.map((file) => {
    return fetch(file.url, {
      method: "POST",
      headers: {
        Authorization: file.token,
        "X-Bz-File-Name": `${uid}/${encodeURIComponent(file.name)}`,
        "Content-Type": "b2/x-auto",
        "X-Bz-Content-Sha1": "do_not_verify",
      },
      body: file.compressed,
    });
  });
  const res = await Promise.all(requests);
  const fileInfos = await Promise.all(res.map((r) => r.json()));

  postMessage(
    chunk.map((file, i) => ({
      idx: file.idx,
      name: file.name,
      fileId: fileInfos[i].fileId,
    }))
  );
};
