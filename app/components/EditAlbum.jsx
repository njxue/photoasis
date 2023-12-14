"use client";

import deleteAlbum from "@actions/deleteAlbum";
import updateAlbum from "@actions/updateAlbum";
import Modal from "@app/common/Modal/Modal";
import { ModalBody } from "@app/common/Modal/ModalBody";
import { ModalHeader } from "@app/common/Modal/ModalHeader";
import SubmitButton from "@app/common/SubmitButton";
import { useState } from "react";

const EditAlbum = ({ data }) => {
  const { name, aid } = data;
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isConfirmationModalOpen, setIsConfirmationModalOpen] = useState(false);

  async function handleDeleteAlbum(formdata) {
    const confirmText = formdata.get("deleteConfirmation");
    if (confirmText === "Delete") {
      const res = await deleteAlbum(aid);
      if (res.status === 204) {
        setIsConfirmationModalOpen(false);
        setIsEditModalOpen(false);
      }
    }
  }

  async function handleUpdateAlbum(formdata) {
    const albumName = formdata.get("albumName");
    await updateAlbum({ aid, albumName });
    setIsEditModalOpen(false);
  }
  return (
    <>
      <img
        src={"/assets/icons/pencil.svg"}
        onClick={() => {
          setIsEditModalOpen(true);
        }}
      />
      <Modal isOpen={isEditModalOpen} setOpen={setIsEditModalOpen} size="sm">
        <ModalHeader closeButton>
          Edit '<b>{name}</b>'
        </ModalHeader>
        <ModalBody>
          <div className="flex flex-col justify-between h-full gap-2">
            <form action={handleUpdateAlbum}>
              <label htmlFor="albumName">Name:</label>
              <div className="flex flex-row items-stretch justify-stretch gap-2">
                <input
                  className="w-full border border-solid border-gray-600 rounded p-1 grow"
                  type="text"
                  name="albumName"
                  defaultValue={name}
                  placeholder="Album Name"
                />
                <div className="h-full">
                  <SubmitButton text="Save" />
                </div>
              </div>
            </form>
            <button
              onClick={() => {
                setIsConfirmationModalOpen(true);
              }}
              className="bg-red-900 rounded text-white w-full">
              Delete album
            </button>
          </div>
        </ModalBody>
      </Modal>
      <Modal
        isOpen={isConfirmationModalOpen}
        setOpen={setIsConfirmationModalOpen}
        size="sm">
        <ModalHeader>Are you sure you want to delete this album?</ModalHeader>
        <ModalBody>
          <form className="w-full" action={handleDeleteAlbum}>
            <label for="deleteConfirmation">Type "Delete" to confirm: </label>
            <input
              className="w-full border border-solid border-gray-600 rounded p-1"
              type="text"
              name="deleteConfirmation"
            />
            <div className="flex flex-row gap-1 w-full mt-1">
              <SubmitButton text="Yes" />

              <button
                onClick={() => {
                  setIsConfirmationModalOpen(false);
                }}
                className="bg-red-700 rounded p-2 text-white w-full">
                No
              </button>
            </div>
          </form>
        </ModalBody>
      </Modal>
    </>
  );
};

export default EditAlbum;
