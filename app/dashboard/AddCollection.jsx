"use client";
import { useEffect, useState } from "react";
import createCollection from "@actions/createCollection";
import Modal from "../../app/components/Modal/Modal";
import { ModalBody } from "../../app/components/Modal/ModalBody";
import { ModalHeader } from "../../app/components/Modal/ModalHeader";
import SubmitButton from "../../app/components/SubmitButton";
import { ModalFooter } from "@app/components/Modal/ModalFooter";
import Image from "next/image";
import ExifReader from "exifreader";
import { b2GetUploadUrl } from "@utils/b2";
import { useSession } from "next-auth/react";
import pako from "pako";

const AddCollection = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [imagePreviews, setImagePreviews] = useState([]);
  const [isLoadingPreview, setIsLoadingPreview] = useState(false);
  const [selectedPhoto, setSelectedPhoto] = useState(null);

  const { data: session } = useSession();
  const uid = session?.user.id;

  async function handleCreateCollection(formdata) {
    try {
      const files = formdata.getAll("photos");

      /* const uploadFiles = () =>
        new Promise((resolve, reject) => {
          if (!window.Worker) {
            console.log("Unable to create worker");
          }
          let count = 0;
          let completed = 0;
          files.forEach(async (file) => {
            const worker = new Worker("worker.js");
            formdata.delete("photos");
            const buffer = Buffer.from(await file.arrayBuffer());

            let { url, token } = await b2GetUploadUrl();
            worker.postMessage({
              buffer,
              url,
              token,
              filename: `${uid}/${file.name}`,
            });
            count++;
            worker.onmessage = (e) => {
              worker.terminate();
              completed++;

              if (e.data) {
                formdata.append("fileName", file.name);
              } else {
                console.log("failed to upload " + file.name);
              }
              if (14 === completed) {
                resolve();
              }
            }; 
          });
        });
      await uploadFiles(); */
      const requests = files.map(async (file) => {
        formdata.delete("photos");
        formdata.append("fileName", file.name);
        const buffer = Buffer.from(await file.arrayBuffer());
        let { url, token } = await b2GetUploadUrl();
        return fetch(url, {
          method: "POST",
          headers: {
            Authorization: token,
            "X-Bz-File-Name": `${uid}/${file.name}`,
            "Content-Type": "b2/x-auto",
            "X-Bz-Content-Sha1": "do_not_verify",
          },
          body: buffer,
        }).then((res) => console.log(res.status));
      });
      await Promise.all(requests);

      const res = await createCollection(formdata);
      if (res.status === 200) {
        setIsModalOpen(false);
      }
    } catch (err) {
      console.log(err);
    }
  }

  async function handleChange(e) {
    setIsLoadingPreview(true);
    const fileList = e.target.files;
    const previews = [];
    for (let i = 0; i < fileList.length; i++) {
      const metadata = await ExifReader.load(fileList[i]);
      const aperture = metadata["FNumber"]
        ? metadata["FNumber"].value[0] / metadata["FNumber"].value[1]
        : null;
      const iso = metadata["ISOSpeedRatings"]?.value;
      const shutterspeed = metadata["ShutterSpeedValue"]?.value;
      previews.push({
        name: fileList[i].name,
        url: URL.createObjectURL(fileList[i]),
        aperture,
        iso,
        shutterspeed,
      });
    }
    setImagePreviews(previews);
  }
  function handleClickPhoto(e) {
    setSelectedPhoto(e.target.id);
  }

  useEffect(() => {
    setImagePreviews([]);
  }, [isModalOpen]);

  useEffect(() => {
    setIsLoadingPreview(false);
  }, [imagePreviews]);

  return (
    <>
      <button onClick={() => setIsModalOpen(true)}>Create new</button>
      <Modal isOpen={isModalOpen} setOpen={setIsModalOpen}>
        <ModalHeader size="lg">New Collection</ModalHeader>
        <ModalBody>
          <form
            className="flex flex-col gap-3 p-2 w-full h-full justify-between"
            action={handleCreateCollection}>
            <div>
              <div>
                <label htmlFor="collectionName">Collection Name: </label>
                <input
                  className="w-full block border border-solid border-gray-600 rounded p-1"
                  type="text"
                  name="collectionName"
                  placeholder="Collection Name"
                  required
                />
              </div>
              <div>
                <label htmlFor="photo">Photos: </label>
                <input
                  type="file"
                  name="photos"
                  accept="image/*"
                  multiple
                  required
                  className="block"
                  onChange={handleChange}
                />
              </div>
              <div className="flex flex-row gap-1 flex-wrap">
                {isLoadingPreview
                  ? "Loading preview..."
                  : imagePreviews.map((image) => (
                      <Image
                        className={`hover:opacity-100 ${
                          selectedPhoto === image.name
                            ? "opacity-100"
                            : "opacity-50"
                        }`}
                        width={100}
                        height={20}
                        src={image.url}
                        onClick={handleClickPhoto}
                        key={image.name}
                        id={image.name}
                        priority={true}
                      />
                    ))}
              </div>
              {imagePreviews.map((image) => (
                <div hidden={selectedPhoto !== image.name}>
                  <p>{image.name}</p>
                  <label>Aperture: </label>
                  <input
                    className="border border-solid border-gray-600 rounded p-1"
                    type="number"
                    name="aperture"
                    step={0.1}
                    min={0}
                    defaultValue={image.aperture}
                    placeholder="Aperture"
                  />
                  <label>Shutter Speed: </label>
                  <input
                    className="border border-solid border-gray-600 rounded p-1"
                    type="text"
                    name="shutterspeed"
                    defaultValue={image.shutterspeed}
                    placeholder="Shutter Speed"
                  />
                  <label>ISO: </label>
                  <input
                    className="border border-solid border-gray-600 rounded p-1"
                    type="number"
                    name="iso"
                    min={0}
                    defaultValue={image.iso}
                    placeholder="ISO"
                  />
                  <div />
                </div>
              ))}
            </div>
            <SubmitButton />
          </form>
        </ModalBody>
        <ModalFooter>test</ModalFooter>
      </Modal>
    </>
  );
};

export default AddCollection;
