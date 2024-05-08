"use client";
import { useEffect, useState } from "react";
import { SelectProvider } from "@app/common/Select/SelectContext";
import DashboardHeader from "./DashboardHeader";
import DashboardBody from "./DashboardBody";

const Dashboard = ({ albums }) => {
  const [filteredAlbums, setFilteredAlbums] = useState(albums);
  const [searchTerm, setSearchTerm] = useState("");

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
