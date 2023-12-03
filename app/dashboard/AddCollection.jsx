"use client";
import { useEffect, useState, useRef } from "react";
import createCollection from "@actions/createCollection";
import Modal from "../components/Modal/Modal";
import { ModalBody } from "../components/Modal/ModalBody";
import { ModalHeader } from "../components/Modal/ModalHeader";
import SubmitButton from "../components/SubmitButton";
import { ModalFooter } from "@app/components/Modal/ModalFooter";
import Image from "next/image";
import ExifReader from "exifreader";
const AddCollection = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [imagePreviews, setImagePreviews] = useState([]);
  const [isLoadingPreview, setIsLoadingPreview] = useState(false);
  const [selectedPhoto, setSelectedPhoto] = useState(null);

  async function handleCreateCollection(formdata) {
    const res = await createCollection(formdata);

    if (res === 200) {
      setIsModalOpen(false);
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
      console.log(aperture);
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
