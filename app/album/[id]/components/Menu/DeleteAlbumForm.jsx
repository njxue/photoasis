"use client";

import deleteAlbum from "@actions/deleteAlbum";
import Modal from "@app/common/Modal/Modal";
import { ModalHeader } from "@app/common/Modal/ModalHeader";
import { ModalBody } from "@app/common/Modal/ModalBody";
import SubmitButton from "@app/common/SubmitButton";

const DeleteAlbumForm = ({ albumData, isDeleting, setIsDeleting }) => {
  const { aid } = albumData;
  async function handleDeleteAlbum(formdata) {
    const confirmText = formdata.get("deleteConfirmation");
    if (confirmText === "Delete") {
      const res = await deleteAlbum(aid);
      if (res.status === 204) {
        console.log("Redirecting");
      }
    }
  }

  return (
    <Modal isOpen={isDeleting} setOpen={setIsDeleting} size="sm">
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
                setIsDeleting(false);
              }}
              className="bg-red-700 rounded p-2 text-white w-full">
              No
            </button>
          </div>
        </form>
      </ModalBody>
    </Modal>
  );
};

export default DeleteAlbumForm;
