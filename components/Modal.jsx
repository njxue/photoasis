"use client";

import addPhoto from "@actions/addPhoto";
import { useSession } from "next-auth/react";
import SubmitButton from "./SubmitButton";

const Modal = ({ isOpen, setIsOpen }) => {
  const { data: session } = useSession();
  const handleAddPhoto = (formData) => {
    addPhoto(formData, session?.user.id);
  };
  return (
    <div>
      {isOpen && (
        <div className="fixed inset-0 bg-gray-700 bg-opacity-80 backdrop-blur-sm flex flex-col justify-center items-center z-50">
          <div className="bg-white w-[70%] h-[90%] flex flex-col justify-between">
            <div>
              <h1>Add Images</h1>
            </div>
            <div>
              <form action={handleAddPhoto}>
                <label htmlFor="photo">Photos: </label>
                <input type="file" name="photo" />
                <SubmitButton />
              </form>
            </div>
            <div>
              Modal Footer
              <button onClick={() => setIsOpen(false)}>Close Modal</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Modal;
