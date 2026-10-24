"use client";

import AlbumSelect from "./AlbumSelect";
import Link from "next/link";
import { useSelect } from "./Select/SelectContext";

function DashboardHeader({ handleSearchTermChange }) {
  const { isSelecting } = useSelect();

  return (
    <header className="mb-8 border-b border-black/15 pb-5">
      <div className="flex flex-wrap items-end justify-between gap-5">
        <div>
          <p className="eyebrow">Your archive</p>
          <h1 className="page-title">Library</h1>
        </div>
        <div className="flex w-full items-center gap-2 sm:w-auto">
          <AlbumSelect />
          {!isSelecting && (
            <Link
              href="/album/new"
              className="primary-action min-w-0 flex-1 whitespace-nowrap sm:flex-none">
              <span className="text-lg font-light leading-none">+</span>
              New album
            </Link>
          )}
        </div>
      </div>
      <div className="mt-6 flex flex-wrap items-center justify-between gap-3">
        <search className="w-full sm:w-72">
          <input
            type="search"
            onChange={handleSearchTermChange}
            placeholder="Search albums"
            className="minimal-input w-full"
          />
        </search>
      </div>
    </header>
  );
}

export default DashboardHeader;
