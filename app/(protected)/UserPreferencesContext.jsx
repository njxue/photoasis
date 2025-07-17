"use client";
import { createContext, useContext, useState } from "react";

const UserPreferencesContext = createContext();

export const useUserPreferences = () => useContext(UserPreferencesContext);

export const UserPreferencesProvider = ({ data, children }) => {
  const defaultPreferences = { objectFit: "object-contain" };
  const [userPreferences, setUserPreferences] = useState(
    data ?? defaultPreferences
  );

  return (
    <UserPreferencesContext.Provider
      value={{ userPreferences, setUserPreferences }}>
      {children}
    </UserPreferencesContext.Provider>
  );
};
