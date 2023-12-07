"use client";
import { useEffect, useState } from "react";
import Modal from "../../app/components/Modal/Modal";
import { ModalBody } from "../../app/components/Modal/ModalBody";
import { ModalHeader } from "../../app/components/Modal/ModalHeader";
import SubmitButton from "../../app/components/SubmitButton";
import { ModalFooter } from "@app/components/Modal/ModalFooter";
import Image from "next/image";
import ExifReader from "exifreader";
import { b2GetUploadUrls, b2GetUploadUrl } from "@actions/b2";
import { useSession } from "next-auth/react";
import imageCompression from "browser-image-compression";
import updateCollection from "@actions/updateCollection";
import createCollection from "@actions/createCollection";
const AddCollection = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [imagePreviews, setImagePreviews] = useState([]);
  const [isLoadingPreview, setIsLoadingPreview] = useState(false);
  const [selectedPhoto, setSelectedPhoto] = useState(null);

  const { data: session } = useSession();
  const uid = session?.user.id;

  async function handleCreateCollection(formdata) {
    try {
      let files = formdata.getAll("photos");
      const aperture = formdata.getAll("aperture");
      const shutterspeed = formdata.getAll("shutterspeed");
      const iso = formdata.getAll("iso");
      const collectionName = formdata.get("collectionName");

      const collectionRes = await createCollection({
        collectionName,
      });
      if (collectionRes.status !== 200) {
        // Handle error
      }
      const cid = collectionRes.data.cid;
      // Compress and assign upload urls and auth tokens
      files = files.map(async (file, i) => {
        // To avoid sending the entire File object to server, which may exceed the payload limit
        formdata.delete("photos");
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
              collectionName,
              photos: fileInfos,
            });
            if (res.status === 200) {
              setIsModalOpen(false);
            }
          }
        };
      }
    } catch (err) {
      console.log(err);
    }
  }

  async function handleChange(e) {
    setIsLoadingPreview(true);
    const fileList = e.target.files;
    const previews = [];
    let aperture = null;
    let iso = null;
    let shutterspeed = null;
    for (let i = 0; i < fileList.length; i++) {
      try {
        const metadata = await ExifReader.load(fileList[i]);
        aperture = metadata["FNumber"]
          ? metadata["FNumber"].value[0] / metadata["FNumber"].value[1]
          : null;
        iso = metadata["ISOSpeedRatings"]?.value;
        shutterspeed = metadata["ShutterSpeedValue"]?.value;
      } catch (err) {
        console.log("No metadata");
      }

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
                        alt={image.name}
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
