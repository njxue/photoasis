"use client";
import { useState } from "react";
import Modal from "@app/common/Modal/Modal";
import { ModalBody } from "@app/common/Modal/ModalBody";
import { ModalHeader } from "@app/common/Modal/ModalHeader";
import SubmitButton from "@app/common/SubmitButton";
import { useSession } from "next-auth/react";
import createCollection from "@actions/createCollection";
import formUploadPhotos from "@utils/formUploadPhotos";
import updateCollection from "@actions/updateCollection";
import DroppableFileInput from "@app/common/DroppableFileInput";
const AddCollection = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { data: session } = useSession();
  const uid = session?.user.id;

  async function handleCreateCollection(formdata) {
    try {
      const collectionName = formdata.get("collectionName");

      const collectionRes = await createCollection({
        collectionName,
      });
      console.log(collectionRes);
      if (collectionRes.status !== 200) {
        // Handle error
      }
      const cid = collectionRes.data.cid;
      const fileInfos = await formUploadPhotos(cid, uid, formdata);
      await updateCollection({ cid, photos: fileInfos });
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
        <p>New Collection</p>
        <img src="/assets/icons/add.svg" width={30} height={30} />
      </div>
      {/* <button onClick={() => setIsModalOpen(true)}>Create new</button> */}
      <Modal isOpen={isModalOpen} setOpen={setIsModalOpen}>
        <ModalHeader size="lg">New Collection</ModalHeader>
        <ModalBody>
          <form
            className="flex flex-col gap-3 p-2 w-full h-full justify-between"
            action={handleCreateCollection}>
            <div className="flex flex-col grow gap-2">
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
              <DroppableFileInput name="photos" />
            </div>
            <SubmitButton />
          </form>
        </ModalBody>
      </Modal>
    </>
  );
};

export default AddCollection;
