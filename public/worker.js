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
  const uploadFiles = await Promise.all(requests);
  postMessage("ok");
};
