"use client";
import Modal from "@app/common/Modal/Modal";
import { ModalBody } from "@app/common/Modal/ModalBody";
import SubmitButton from "@app/common/SubmitButton";
import { useState } from "react";
import { useSession } from "next-auth/react";
import formUploadPhotos from "@utils/formUploadPhotos";
import updateAlbum from "@actions/updateAlbum";
import DroppableFileInput from "@app/common/DroppableFileInput";

const AddPhotos = ({ aid }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { data: session } = useSession();

  async function handleSubmit(formdata) {
    try {
      const fileInfos = await formUploadPhotos(aid, session?.user.id, formdata);
      await updateAlbum({ aid, photos: fileInfos });
      setIsModalOpen(false);
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
      <Modal isOpen={isModalOpen} setOpen={setIsModalOpen} closeOnClickOutside size="md">
        <ModalBody>
          <form
            className="flex flex-col gap-3 p-2 w-full h-full justify-between"
            action={handleSubmit}>
            <DroppableFileInput name="photos" />
            <SubmitButton />
          </form>
        </ModalBody>
      </Modal>
    </>
  );
};

export default AddPhotos;
