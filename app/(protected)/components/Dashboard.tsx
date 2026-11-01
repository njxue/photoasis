"use client";
import { useState, type ChangeEvent } from "react";
import { SelectProvider } from "@app/(protected)/components/Select/SelectContext";
import DashboardHeader from "./DashboardHeader";
import DashboardBody from "./DashboardBody";
import { notFound } from "next/navigation";
import { toast } from "react-toastify";
import useDebounce from "@app/common/hooks/useDebounce";
import type { AlbumWithThumbnail } from "@/types/albums";

interface DashboardProps {
  albums: AlbumWithThumbnail[] | null;
}

const Dashboard = ({ albums }: DashboardProps) => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  if (!albums) {
    toast.error("Unable to fetch albums. Please try again later", {
      toastId: "Error: Fetch albums",
    });
    notFound();
  }

  function handleSearchTermChange(event: ChangeEvent<HTMLInputElement>) {
    setSearchTerm(event.target.value.toUpperCase().trim());
  }

  return (
    <>
      <SelectProvider>
        <DashboardHeader handleSearchTermChange={handleSearchTermChange} />
        <DashboardBody albums={albums} searchTerm={debouncedSearchTerm} />
      </SelectProvider>
    </>
  );
};
export default Dashboard;
