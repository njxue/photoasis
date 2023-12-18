"use client";

import { useState, useEffect, useRef } from "react";
const AlbumMenu = ({ setIsDeleting, setIsEditing, setIsAddingPhotos }) => {
  const [showMenuItems, setShowMenuItems] = useState(false);
  const menuRef = useRef();
  useEffect(() => {
    const handleClick = (e) => {
      if (!menuRef.current?.contains(e.target)) {
        setShowMenuItems(false);
      }
    };
    if (showMenuItems) {
      document.addEventListener("click", handleClick);
    }
    return () => document.removeEventListener("click", handleClick);
  }, [showMenuItems]);

  return (
    <div className="relative">
      <img
        src="/assets/icons/vertical-dots.svg"
        className="min-w-[30px] w-[30px] cursor-pointer"
        onClick={() => {
          setShowMenuItems((prev) => !prev);
        }}
      />
      {showMenuItems && (
        <div
          className="flex flex-col absolute z-50 bg-white w-[200px] right-0 rounded border border-solid border-gray-200 mt-2"
          ref={menuRef}>
          <div
            className="cursor-pointer hover:bg-gray-500 hover:text-white p-2"
            onClick={() => setIsAddingPhotos(true)}>
            Add Photos
          </div>
          <hr />
          <div
            className="cursor-pointer hover:bg-gray-500 hover:text-white p-2"
            onClick={() => setIsEditing(true)}>
            Edit
          </div>
          <hr />
          <div
            className="cursor-pointer hover:bg-gray-500 hover:text-white p-2"
            onClick={() => setIsDeleting(true)}>
            Delete
          </div>
        </div>
      )}
    </div>
  );
};

export default AlbumMenu;
