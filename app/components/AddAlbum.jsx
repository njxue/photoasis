"use client";
import { useState } from "react";
import Modal from "@app/common/Modal/Modal";
import { ModalBody } from "@app/common/Modal/ModalBody";
import { ModalHeader } from "@app/common/Modal/ModalHeader";
import SubmitButton from "@app/common/SubmitButton";
import { useSession } from "next-auth/react";
import createAlbum from "@actions/createAlbum";
import formUploadPhotos from "@utils/formUploadPhotos";
import updateAlbum from "@actions/updateAlbum";
import { createPortal } from "react-dom";
import DroppableFileInput from "@app/common/DroppableFileInput";
const AddAlbum = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { data: session } = useSession();
  const uid = session?.user.id;

  async function handleCreateAlbum(formdata) {
    try {
      const albumName = formdata.get("albumName");

      const albumRes = await createAlbum({
        albumName,
      });

      if (albumRes.status !== 200) {
        // Handle error
      }
      const aid = albumRes.data.aid;
      const fileInfos = await formUploadPhotos(aid, uid, formdata);
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
        <p>New Album</p>
        <img src="/assets/icons/add.svg" width={30} height={30} />
      </div>

      <Modal isOpen={isModalOpen} setOpen={setIsModalOpen} size="lg">
        <ModalHeader size="lg" closeButton>New Album</ModalHeader>
        <ModalBody>
          <form
            className="flex flex-col gap-3 p-2 w-full h-full justify-between"
            action={handleCreateAlbum}>
            <div className="flex flex-col grow gap-2">
              <div>
                <label htmlFor="albumName">Album Name: </label>
                <input
                  className="w-full block border border-solid border-gray-600 rounded p-1"
                  type="text"
                  name="albumName"
                  placeholder="Album Name"
                  required
                />
              </div>
              <DroppableFileInput name="photos" />
            </div>
            <SubmitButton />
          </form>
        </ModalBody>
      </Modal>
    </>
  );
};

export default AddAlbum;
