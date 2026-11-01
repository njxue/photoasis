import updatePhoto from "@actions/updatePhoto";
import CancelButton from "@app/(protected)/components/CancelButton";
import BuildInputs from "../../ImageUpload/InputFields/BuildInputs";
import ExposureInputs from "../../ImageUpload/InputFields/ExposureInputs";
import SubmitButton from "@app/common/SubmitButton";
import { toast } from "react-toastify";
import type { Photo } from "@/generated/prisma/client";
import type { UpdatePhotoInput } from "@/types/photos";
import type { PhotoDataInput } from "@utils/helpers";

const EDITABLE_PHOTO_FIELDS = [
  "name",
  "shutterspeed",
  "description",
  "meteringMode",
  "exposureMode",
  "lensModel",
  "cameraModel",
  "editingSoftware",
  "aperture",
  "iso",
  "focalLength",
  "date",
] as const satisfies readonly (keyof PhotoDataInput)[];

interface UpdatePhotoFormProps {
  photo: Photo;
  onCancel: () => void;
  onUpdate?: () => void;
}

export default function UpdatePhotoForm({ photo, onCancel, onUpdate }: UpdatePhotoFormProps) {
  const formData = { ...photo };
  const handleUpdatePhoto = async () => {
    const toastId = toast.loading("Updating photo...");
    try {
      const changedFields = Object.fromEntries(
        EDITABLE_PHOTO_FIELDS.filter(
          (field) => formData[field] !== photo[field],
        ).map((field) => [field, formData[field]]),
      ) as Omit<UpdatePhotoInput, "pid">;
      const res = await updatePhoto({
        pid: photo.pid,
        ...changedFields,
      });

      if (!res.ok || !res.data) {
        toast.update(toastId, {
          render: "Unable to update photo",
          type: toast.TYPE.ERROR,
          autoClose: 3000,
          isLoading: false,
        });
        return;
      }

      Object.assign(photo, res.data);

      toast.update(toastId, {
        render: "Photo updated!",
        type: toast.TYPE.SUCCESS,
        autoClose: 3000,
        isLoading: false,
      });
      onUpdate?.();
    } catch (err) {
      toast.update(toastId, {
        render: err instanceof Error ? err.message : String(err),
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
