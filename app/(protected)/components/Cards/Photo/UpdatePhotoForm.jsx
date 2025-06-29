import updatePhoto from "@actions/updatePhoto";
import CancelButton from "@app/(protected)/components/CancelButton";
import BuildInputs from "../../ImageUpload/InputFields/BuildInputs";
import ExposureInputs from "../../ImageUpload/InputFields/ExposureInputs";
import SubmitButton from "@app/common/SubmitButton";
import { toast } from "react-toastify";

export default function UpdatePhotoForm({ photo, onCancel, onUpdate }) {
  const formData = { ...photo };
  const handleUpdatePhoto = async () => {
    const toastId = toast.loading("Updating photo...");
    try {
      const changedFields = {};

      for (const field in formData) {
        if (formData[field] !== photo[field]) {
          changedFields[field] = formData[field];
        }
      }
      const res = await updatePhoto({
        pid: photo.pid,
        ...changedFields,
      });

      if (!res.ok) {
        toast.update(toastId, {
          render: "Unable to update photo",
          type: toast.TYPE.ERROR,
          autoClose: 3000,
          isLoading: false,
        });
      }

      for (const field in changedFields) {
        photo[field] = res.data[field];
      }

      toast.update(toastId, {
        render: "Photo updated!",
        type: toast.TYPE.SUCCESS,
        autoClose: 3000,
        isLoading: false,
      });
      onUpdate?.();
    } catch (err) {
      toast.update(toastId, {
        render: err,
        type: toast.TYPE.ERROR,
        autoClose: 3000,
        isLoading: false,
      });
    }
  };

  return (
    <form action={handleUpdatePhoto}>
      <div className="bg-[rgba(0,0,0,0.9)] rounded p-3 flex flex-col gap-3 min-w-[300px]">
        <div className="invert mt-1">
          <ExposureInputs fileData={formData} />
        </div>
        <hr className="border-1 border-gray-800" />
        <div className="invert mt-2">
          <BuildInputs fileData={formData} />
        </div>
        <div className="flex flex-row gap-3">
          <SubmitButton />
          <CancelButton onCancel={onCancel} />
        </div>
      </div>
    </form>
  );
}
