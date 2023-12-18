"use client";
import Modal from "@app/common/Modal/Modal";
import { ModalBody } from "@app/common/Modal/ModalBody";
import SubmitButton from "@app/common/SubmitButton";
import { useSession } from "next-auth/react";
import formUploadPhotos from "@utils/formUploadPhotos";
import updateAlbum from "@actions/updateAlbum";
import DroppableFileInput from "@app/common/DroppableFileInput";

const AddPhotosForm = ({ albumData, show, setShow }) => {
  const { data: session } = useSession();
  const { aid } = albumData;
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
    <Modal isOpen={show} setOpen={setShow} closeOnClickOutside size="lg">
      <ModalBody>
        <form
          className="flex flex-col gap-3 p-2 w-full h-full justify-between"
          action={handleSubmit}>
          <DroppableFileInput name="photos" />
          <SubmitButton />
        </form>
      </ModalBody>
    </Modal>
  );
};

export default AddPhotosForm;