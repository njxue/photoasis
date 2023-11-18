"use client";
import { useState } from "react";
import Modal from "./Modal";
const AddCollection = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  return (
    <>
      <button onClick={() => setIsModalOpen(true)}>Create new</button>
      <Modal isOpen={isModalOpen} setIsOpen={setIsModalOpen} />
    </>
  );
};

export default AddCollection;
