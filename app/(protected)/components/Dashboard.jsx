"use client";
import { useState } from "react";
import { SelectProvider } from "@app/(protected)/components/Select/SelectContext";
import DashboardHeader from "./DashboardHeader";
import DashboardBody from "./DashboardBody";
import { notFound } from "next/navigation";
import { toast } from "react-toastify";
import useDebounce from "@app/common/hooks/useDebounce";

const Dashboard = ({ albums }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  if (!albums) {
    toast.error("Unable to fetch albums. Please try again later", {
      toastId: "Error: Fetch albums",
    });
    notFound();
  }

  function handleSearchTermChange(e) {
    setSearchTerm(e.target.value.toUpperCase().trim());
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
