"use client";
import Modal from "@app/common/Modal/Modal";
import { ModalBody } from "@app/common/Modal/ModalBody";
import SubmitButton from "@app/common/SubmitButton";
import { useSession } from "next-auth/react";
import { formUploadPhotos } from "@utils/imageUploadUtils";
import updateAlbum from "@actions/updateAlbum";
import DroppableFileInput from "@app/common/ImageUpload/DroppableFileInput";
import { toast } from "react-toastify";
import CancelButton from "@app/common/CancelButton";
import { formatFormData } from "@utils/imageUploadUtils";
import { useImageUploadContext } from "@app/common/ImageUpload/ImageUploadContext";

const AddPhotosForm = ({ albumData, show, setShow }) => {
  const errorMessage = "Unable to add photo(s). Please try again later";
  const { data: session } = useSession();
  const { aid } = albumData;

  const { filesForUpload, resetFiles } = useImageUploadContext();

  async function handleSubmit(formdata) {
    try {
      const formattedFormData = formatFormData(formdata, filesForUpload);
      const b2UploadRes = await formUploadPhotos(
        aid,
        session?.user.id,
        formattedFormData
      );

      if (b2UploadRes.status !== 200) {
        toast.error(b2UploadRes.message);
        return;
      }
      const fileInfos = b2UploadRes.data;
      const res = await updateAlbum({ aid, photos: fileInfos });
      if (res.ok) {
        setShow(false);
        toast.success("New photo(s) added!");
        resetFiles();
      } else {
        toast.error(errorMessage);
      }
    } catch (err) {
      console.log(err);
      toast.error(errorMessage);
    }
  }
  return (
    <Modal isOpen={show} setOpen={setShow}>
      <ModalBody>
        <div className="h-[90vh] w-[80vw]">
          <form
            className="flex flex-col gap-3 p-2 w-full h-full justify-between"
            action={handleSubmit}>
            <DroppableFileInput required />
            <div className="flex flex-row gap-2">
              <CancelButton onCancel={() => setShow(false)} />
              <SubmitButton text="Add Photos" preventBrowserRefresh />
            </div>
          </form>
        </div>
      </ModalBody>
    </Modal>
  );
};

export default AddPhotosForm;
