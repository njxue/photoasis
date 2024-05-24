"use client";
import { useState } from "react";
import { SelectProvider } from "@app/common/Select/SelectContext";
import DashboardHeader from "./DashboardHeader";
import DashboardBody from "./DashboardBody";
import { notFound } from "next/navigation";
import { toast } from "react-toastify";

const Dashboard = ({ albums }) => {
  const [searchTerm, setSearchTerm] = useState("");

  if (!albums) {
    toast.error("Unable to fetch albums. Please try again later", {
      toastId: "Error: Fetch albums",
    });
    notFound();
  }

  const filteredAlbums = albums.filter((album) =>
    album.name.toUpperCase().trim().includes(searchTerm)
  );

  function handleSearchTermChange(e) {
    setSearchTerm(e.target.value.toUpperCase().trim());
  }

  return (
    <>
      <SelectProvider>
        <DashboardHeader handleSearchTermChange={handleSearchTermChange} />
        <DashboardBody albums={filteredAlbums} key={filteredAlbums} />
      </SelectProvider>
    </>
  );
};
export default Dashboard;
