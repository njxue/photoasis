"use client";
import CancelButton from "@app/(protected)/components/CancelButton";
import ImageFit from "./ImageFit";
import { useUserPreferences } from "@app/(protected)/UserPreferencesContext";
import { useEffect, useState } from "react";
import updateUserPreferences from "@actions/updateUserPreferences";
import { toast } from "react-toastify";
import { isEqualDeep } from "@utils/helpers";

const Settings = ({ user }) => {
  // Original userPreferences. Do not update this until successful save
  const { userPreferences, setUserPreferences } = useUserPreferences();

  // New userPreferences. Update this
  const [newUserPreferences, setNewUserPreferences] = useState(userPreferences);

  const [isSaving, setIsSaving] = useState(false);

  const isSettingsChanged = isEqualDeep(userPreferences, newUserPreferences);

  const handleCancel = () => {
    // Reset settings to original
    setNewUserPreferences({ ...userPreferences });
  };

  const handleSave = async () => {
    setIsSaving(true);
    const toastId = toast.loading("Saving...");
    try {
      await updateUserPreferences(newUserPreferences);

      setTimeout(() => {
        // Add delay to feel more natural
        toast.update(toastId, {
          render: "Settings saved",
          type: toast.TYPE.SUCCESS,
          autoClose: 3000,
          isLoading: false,
        });
        setIsSaving(false);
        setUserPreferences({ ...newUserPreferences });
      }, 1000);
    } catch (err) {
      toast.update(toastId, {
        render: "Unable to save settings",
        type: toast.TYPE.ERROR,
        autoClose: 3000,
        isLoading: false,
      });
      console.error(err);
      setIsSaving(false);
    }
  };

  return (
    <>
      <div className="flex flex-col gap-6 p-3 flex-1">
        <div className="flex items-center justify-start gap-5 mt-5">
          <img src={user?.image} className="rounded-full" />
          <div>
            <p className="text-lg sm:text-2xl font-semibold">{user?.name}</p>
            <p className="text-xs xs:text-base">{user?.email}</p>
          </div>
        </div>
        <ImageFit
          newUserPreferences={newUserPreferences}
          setNewUserPreferences={setNewUserPreferences}
        />
      </div>
      {!isSettingsChanged && (
        <div className="flex items-center gap-2 px-3">
          <CancelButton disabled={isSaving} onCancel={handleCancel} />
          <button
            className="btn-gray w-full h-9 text-white font-bold"
            onClick={handleSave}
            disabled={isSaving}>
            Save
          </button>
        </div>
      )}
    </>
  );
};

export default Settings;
