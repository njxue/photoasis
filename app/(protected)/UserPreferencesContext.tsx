"use client";
import {
  createContext,
  useContext,
  useState,
  type Dispatch,
  type ReactNode,
  type SetStateAction,
} from "react";
import type { UserPreferences } from "@/generated/prisma/client";

export type UserPreferencesState = Pick<UserPreferences, "objectFit">;
interface UserPreferencesContextValue {
  userPreferences: UserPreferencesState;
  setUserPreferences: Dispatch<SetStateAction<UserPreferencesState>>;
}
interface UserPreferencesProviderProps {
  data?: UserPreferencesState | null;
  children: ReactNode;
}
const UserPreferencesContext = createContext<UserPreferencesContextValue | null>(null);

export const useUserPreferences = () => {
  const context = useContext(UserPreferencesContext);
  if (!context) throw new Error("useUserPreferences must be used within UserPreferencesProvider");
  return context;
};

export const UserPreferencesProvider = ({
  data,
  children,
}: UserPreferencesProviderProps) => {
  const defaultPreferences: UserPreferencesState = { objectFit: "object-contain" };
  const [userPreferences, setUserPreferences] = useState<UserPreferencesState>(
    data ?? defaultPreferences
  );

  return (
    <UserPreferencesContext.Provider
      value={{ userPreferences, setUserPreferences }}>
      {children}
    </UserPreferencesContext.Provider>
  );
};
