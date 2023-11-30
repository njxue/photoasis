"use client";
import { useEffect, useState, useRef } from "react";
import createCollection from "@actions/createCollection";
import Modal from "../Modal/Modal";
import { ModalBody } from "../Modal/ModalBody";
import { ModalHeader } from "../Modal/ModalHeader";
import SubmitButton from "../SubmitButton";
import { ModalFooter } from "@components/Modal/ModalFooter";
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

  function handleChange(e) {
    setIsLoadingPreview(true);
    const fileList = e.target.files;
    const previews = [];
    for (let i = 0; i < fileList.length; i++) {
      previews.push({
        name: fileList[i].name,
        url: URL.createObjectURL(fileList[i]),
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
            className="flex flex-col gap-3 p-2 w-full"
            action={handleCreateCollection}>
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
                    <img
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
                />
                <label>Shutter Speed: </label>
                <input
                  className="border border-solid border-gray-600 rounded p-1"
                  type="text"
                  name="shutterspeed"
                />
                <label>ISO: </label>
                <input
                  className="border border-solid border-gray-600 rounded p-1"
                  type="number"
                  name="iso"
                  min={0}
                />
                <div />
              </div>
            ))}

            <SubmitButton />
          </form>
        </ModalBody>
        <ModalFooter>test</ModalFooter>
      </Modal>
    </>
  );
};

export default AddCollection;
