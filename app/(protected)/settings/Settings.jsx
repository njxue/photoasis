"use client";
import CancelButton from "@app/(protected)/components/CancelButton";
import ImageFit from "./ImageFit";
import { useUserPreferences } from "@app/(protected)/UserPreferencesContext";
import { useState } from "react";
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
      <div className="flex flex-1 flex-col gap-10 bg-white p-5 sm:p-8">
        <div className="flex items-center justify-start gap-5 border-b border-black/10 pb-8">
          <img
            src={user?.image}
            className="h-16 w-16 rounded-full object-cover ring-1 ring-black/10"
            alt="Profile avatar"
          />
          <div>
            <p className="eyebrow mb-1">Signed in as</p>
            <p className="text-lg font-semibold sm:text-2xl">{user?.name}</p>
            <p className="mt-1 text-xs text-black/45 xs:text-sm">{user?.email}</p>
          </div>
        </div>
        <ImageFit
          newUserPreferences={newUserPreferences}
          setNewUserPreferences={setNewUserPreferences}
        />
      </div>
      {!isSettingsChanged && (
        <div className="sticky bottom-20 flex items-center gap-2 border-t border-black/10 bg-[#f7f7f5]/95 py-4 backdrop-blur md:bottom-0">
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
