"use client";
import Modal from "@components/Modal/Modal";
import { ModalBody } from "@components/Modal/ModalBody";
import Image from "next/image";
import { useState } from "react";

const PhotoCard = ({ photo }) => {
  const [expandPhoto, setExpandPhoto] = useState(false);
  return (
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
          <img src="/assets/icons/aperture.svg" width={20} />
          <span>
            {photo.aperture?.toString() === ""
              ? "-"
              : photo.aperture.toString()}
          </span>
        </div>
        <div class="border-r border-gray-200 h-[20px] w-[1px]"></div>
        <div className="flex flex-row items-center gap-2 flex-wrap">
          <img src="/assets/icons/shutterspeed.svg" width={20} />
          <span>
            {photo.shutterspeed?.toString() === ""
              ? "-"
              : photo.shutterspeed.toString()}
          </span>
        </div>
        <div class="border-r border-gray-200 h-[20px] w-[1px]"></div>
        <div className="flex flex-row items-center gap-2 flex-wrap justify-center">
          <img src="/assets/icons/iso.svg" width={20} />
          <span>
            {photo.iso?.toString() === "" ? "-" : photo.iso.toString()}
          </span>
        </div>
      </div>
      <Modal isOpen={expandPhoto} setOpen={setExpandPhoto}>
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
        </ModalBody>
      </Modal>
    </div>
  );
};

export default PhotoCard;
