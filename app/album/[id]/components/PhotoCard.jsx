"use client";
import Modal from "@app/common/Modal/Modal";
import { ModalBody } from "@app/common/Modal/ModalBody";
import Image from "next/image";
import { useState } from "react";
import PhotoInfo from "./PhotoInfo";
import deletePhoto from "@actions/deletePhoto";
import { usePathname } from "next/navigation";

const PhotoCard = ({ photo, minimalisticView }) => {
  const [expandPhoto, setExpandPhoto] = useState(false);
  const pathname = usePathname();

  async function handleDelete() {
    const res = await deletePhoto(photo, pathname);
  }
  return (
    <>
      <div className="card relative bg-white hover:opacity-50 transition-opacity ease-in-out duration-50">
        <Image
          src={photo.url}
          width={0}
          height={0}
          style={{
            height: minimalisticView ? "100%" : "80%",
            width: "100%  ",
            objectFit: "cover",
          }}
          alt={photo.name}
          onClick={() => {
            setExpandPhoto(true);
          }}
        />
        <div
          className="opacity-0 absolute w-[15%] p-1 right-0 top-0 hover:bg-black rounded hover:opacity-50"
          onClick={handleDelete}>
          <img src="/assets/icons/trash.svg" />
        </div>
        {!minimalisticView && (
          <div className="flex flex-row justify-around items-center p-2">
            <div className="flex flex-row items-center gap-2 flex-wrap">
              <img src="/assets/icons/aperture-black.svg" width={20} />
              <div>{photo.aperture === "" ? "-" : photo.aperture}</div>
            </div>
            <div className="border-r border-gray-200 h-[20px] w-[1px]"></div>
            <div className="flex flex-row items-center gap-2 flex-wrap">
              <img src="/assets/icons/shutterspeed-black.svg" width={20} />
              <div>{photo.shutterspeed === "" ? "-" : photo.shutterspeed}</div>
            </div>
            <div className="border-r border-gray-200 h-[20px] w-[1px]"></div>
            <div className="flex flex-row items-center gap-2 flex-wrap justify-center">
              <img src="/assets/icons/iso-black.svg" width={20} />
              <div>{photo.iso === "" ? "-" : photo.iso}</div>
            </div>
          </div>
        )}
      </div>
      <Modal
        isOpen={expandPhoto}
        setOpen={setExpandPhoto}
        style={{ width: "auto", height: "auto", padding: "1px" }}
        closeOnClickOutside>
        <ModalBody>
          <Image
            src={photo.url}
            width={0}
            height={0}
            style={{
              height: "100%",
              width: "100%",
              objectFit: "contain",
              maxHeight: "80vh",
              maxWidth: "90vw",
            }}
            alt={photo.name}
            onClick={() => {}}
          />
          <div className="absolute top-0 right-0">
            <PhotoInfo photo={photo} />
          </div>
        </ModalBody>
      </Modal>
    </>
  );
};

export default PhotoCard;
