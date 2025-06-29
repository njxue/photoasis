"use client";
import getUserPreferences from "@actions/getUserPreferences";
import { createContext, useContext, useState, useEffect } from "react";

const UserPreferencesContext = createContext();

export const useUserPreferences = () => useContext(UserPreferencesContext);

export const UserPreferencesProvider = ({ children }) => {
  const defaultPreferences = { objectFit: "object-contain" };
  const [userPreferences, setUserPreferences] = useState(defaultPreferences);

  useEffect(() => {
    const fetchUserPreferences = async () => {
      const res = await getUserPreferences();
      if (!res) {
        return;
      }
      const { uid, ...preferences } = res;
      setUserPreferences(preferences);
    };
    fetchUserPreferences();
  }, []);

  return (
    <UserPreferencesContext.Provider
      value={{ userPreferences, setUserPreferences }}>
      {children}
    </UserPreferencesContext.Provider>
  );
};
