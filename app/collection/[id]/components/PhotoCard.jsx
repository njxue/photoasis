"use client";
import Modal from "@app/components/Modal/Modal";
import { ModalBody } from "@app/components/Modal/ModalBody";
import { ModalHeader } from "@app/components/Modal/ModalHeader";
import Image from "next/image";
import { useState } from "react";
import PhotoInfo from "./PhotoInfo";

const PhotoCard = ({ photo }) => {
  const [expandPhoto, setExpandPhoto] = useState(false);
  return (
    <>
      <div className="card min-w-[150px] min-h-[150px] cursor-pointer">
        <Image
          src={photo.url}
          width={0}
          height={0}
          style={{
            height: "80%",
            width: "100%",
            objectFit: "cover",
          }}
          alt={photo.name}
          onClick={() => {
            setExpandPhoto(true);
          }}
        />
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
