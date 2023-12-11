"use client";
import Modal from "@app/common/Modal/Modal";
import { ModalBody } from "@app/common/Modal/ModalBody";
import { ModalHeader } from "@app/common/Modal/ModalHeader";
import SubmitButton from "@app/common/SubmitButton";
import { useEffect, useRef, useState } from "react";
import readFileExif from "@utils/readFileExif";
import ImagePreviews from "@app/components/ImagePreviews";
import { useSession } from "next-auth/react";
import formUploadPhotos from "@utils/formUploadPhotos";
import updateCollection from "@actions/updateCollection";

const AddPhotos = ({ cid }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [images, setImages] = useState([]);
  const inputRef = useRef();
  const { data: session } = useSession();
  
  function handleClick() {
    inputRef.current && inputRef.current.click();
  }

  function handleChange(e) {
    const fileList = e.target.files;
    handlePreview(fileList);
  }

  function handleDragOver(e) {
    e.preventDefault();
  }

  function handleDrop(e) {
    e.preventDefault();
    const fileList = e.dataTransfer.files;
    if (inputRef?.current) {
      inputRef.current.files = fileList;
    }
    handlePreview(fileList);
  }

  async function handlePreview(fileList) {
    const previews = [];
    for (let i = 0; i < fileList.length; i++) {
      previews.push(await readFileExif(fileList[i]));
    }
    setImages(previews);
  }

  async function handleSubmit(formdata) {
    try {
      const fileInfos = await formUploadPhotos(cid, session?.user.id, formdata);
      await updateCollection({ cid, photos: fileInfos });
      setIsModalOpen(false);
      setImages([]);
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <>
      <div
        onClick={() => setIsModalOpen(true)}
        className="flex flex-col gap-3 justify-center items-center border border-dashed border-gray-500 cursor-pointer h-[250px]">
        <p>Add Photos</p>
        <img src="/assets/icons/add.svg" width={30} height={30} />
      </div>
      <Modal isOpen={isModalOpen} setOpen={setIsModalOpen} closeOnClickOutside>
        <ModalBody>
          <form
            className="flex flex-col gap-3 p-2 w-full h-full justify-between"
            action={handleSubmit}>
            <div
              className="border border-dashed border-gray-500 h-full w-full rounded"
              onClick={handleClick}
              onDrop={handleDrop}
              onDragOver={handleDragOver}>
              <input
                type="file"
                name="photos"
                multiple
                className="hidden"
                ref={inputRef}
                onChange={handleChange}
                accept="image/*"
              />
            </div>
            <ImagePreviews images={images} withForm />
            <SubmitButton />
          </form>
        </ModalBody>
      </Modal>
    </>
  );
};

export default AddPhotos;
