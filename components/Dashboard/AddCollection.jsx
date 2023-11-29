"use client";
import { useState } from "react";
import createCollection from "@actions/createCollection";
import Modal from "../Modal/Modal";
import { ModalBody } from "../Modal/ModalBody";
import { ModalHeader } from "../Modal/ModalHeader";
import SubmitButton from "../SubmitButton";
const AddCollection = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  async function handleCreateCollection(formdata) {
    const res = await createCollection(formdata);
    if (res.status === 200) {
      setIsModalOpen(false);
    }
  }
  return (
    <>
      <button onClick={() => setIsModalOpen(true)}>Create new</button>
      <Modal isOpen={isModalOpen} setOpen={setIsModalOpen}>
        <ModalHeader size="lg">New Collection</ModalHeader>
        <ModalBody>
          <form action={handleCreateCollection}>
            <div>
              <label htmlFor="collectionName">Name: </label>
              <input type="text" name="collectionName" required />
            </div>
            <div>
              <label htmlFor="photo">Photos: </label>
              <input
                type="file"
                name="photos"
                accept="image/png, image/jpg, image/jpeg"
                multiple
              />
            </div>
            <SubmitButton />
          </form>
        </ModalBody>
      </Modal>
    </>
  );
};

export default AddCollection;
