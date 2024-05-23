"use client";
import { useEffect, useState } from "react";
import { SelectProvider } from "@app/common/Select/SelectContext";
import DashboardHeader from "./DashboardHeader";
import DashboardBody from "./DashboardBody";
import { notFound } from "next/navigation";
import { toast } from "react-toastify";

const Dashboard = ({ albums }) => {
  const [filteredAlbums, setFilteredAlbums] = useState(albums);
  const [searchTerm, setSearchTerm] = useState("");

  if (!albums) {
    toast.error("Unable to fetch albums. Please try again later", {
      toastId: "Error: Fetch albums",
    });
    notFound();
  }

  function handleSearchTermChange(e) {
    setSearchTerm(e.target.value.toUpperCase().trim());
  }

  useEffect(() => {
    setFilteredAlbums(
      albums.filter((album) =>
        album.name.toUpperCase().trim().includes(searchTerm)
      )
    );
  }, [albums, searchTerm]);

  return (
    <>
      <SelectProvider>
        <DashboardHeader handleSearchTermChange={handleSearchTermChange} />
        <DashboardBody albums={filteredAlbums} />
      </SelectProvider>
    </>
  );
};
export default Dashboard;
