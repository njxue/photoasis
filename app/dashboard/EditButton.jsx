"use client";

import deleteCollection from "@actions/deleteCollection";
import Modal from "@app/components/Modal/Modal";
import { ModalBody } from "@app/components/Modal/ModalBody";
import { ModalHeader } from "@app/components/Modal/ModalHeader";
import SubmitButton from "@app/components/SubmitButton";
import { useState } from "react";

const EditButton = ({ data }) => {
  const { name, cid } = data;
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isConfirmationModalOpen, setIsConfirmationModalOpen] = useState(false);

  async function handleDeleteCollection(formdata) {
    const confirmText = formdata.get("deleteConfirmation");
    if (confirmText === "Delete") {
      const res = await deleteCollection(cid);
      if (res.status === 204) {
        setIsConfirmationModalOpen(false);
        setIsEditModalOpen(false);
      }
    }
  }
  return (
    <>
      <div className="absolute right-0 top-0 bg-black w-[15%] opacity-0 rounded p-1 hover:opacity-50">
        <img
          src={"/assets/icons/pencil.svg"}
          onClick={() => {
            setIsEditModalOpen(true);
          }}
        />
      </div>

      <Modal isOpen={isEditModalOpen} setOpen={setIsEditModalOpen}>
        <ModalHeader>Edit</ModalHeader>
        <ModalBody>
          <div className="flex flex-col justify-between h-full">
            <form>
              <label htmlFor="collectionName">Name:</label>
              <input
                className="w-full border border-solid border-gray-600 rounded p-1"
                type="text"
                name="collectionName"
                defaultValue={name}
                placeholder="Collection Name"
              />
            </form>
            <button
              onClick={() => {
                setIsConfirmationModalOpen(true);
              }}
              className="bg-red-900 rounded text-white w-full">
              Delete collection
            </button>
          </div>
        </ModalBody>
      </Modal>
      <Modal
        isOpen={isConfirmationModalOpen}
        setOpen={setIsConfirmationModalOpen}>
        <ModalHeader>
          Are you sure you want to delete this collection?
        </ModalHeader>
        <ModalBody>
          <form className="w-full" action={handleDeleteCollection}>
            <label for="deleteConfirmation">Type "Delete" to confirm: </label>
            <input
              className="w-full border border-solid border-gray-600 rounded p-1"
              type="text"
              name="deleteConfirmation"
            />
            <div className="flex flex-row gap-1 w-full mt-1">
              <SubmitButton text="Yes" />

              <button className="bg-red-700 rounded p-2 text-white w-full">
                No
              </button>
            </div>
          </form>
        </ModalBody>
      </Modal>
    </>
  );
};

export default EditButton;
