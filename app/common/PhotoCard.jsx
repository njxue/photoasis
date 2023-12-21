"use client";
import Modal from "@app/common/Modal/Modal";
import { ModalBody } from "@app/common/Modal/ModalBody";
import Image from "next/image";
import { useState } from "react";
import PhotoInfo from "./PhotoInfo";
import OptimisedImage from "./OptimisedImage";

const PhotoCard = ({ photo, minimalisticView, expandable, disableHover }) => {
  const [expandPhoto, setExpandPhoto] = useState(false);

  return (
    <>
      <div className="card  bg-white">
        <OptimisedImage
          src={photo.url}
          onClick={() => {
            expandable && setExpandPhoto(true);
          }}
          className={`${
            minimalisticView ? "h-full" : "h-5/6"
          } object-cover w-full  ${
            !disableHover && "hover:opacity-50"
          } transition-opacity ease-in-out duration-50`}
        />

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
        closeOnClickOutside
        size="md">
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
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            quality={100}
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
