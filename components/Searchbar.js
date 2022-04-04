import React, { useState } from "react";
import { useRouter } from "next/router";

const Searchbar = () => {
  const router = useRouter();
  const [search, setSearch] = useState("");

  const handleSearch = (e) => {
    if (e.keyCode === 13) router.push(`/search/${search}`);
  };

  return (
    <input
      type="text"
      placeholder="Search"
      className="w-full p-2 mb-4 rounded bg-white bg-opacity-10 border-gray-500 border lg:hidden"
      value={search}
      onChange={(e) => setSearch(e.target.value)}
      onKeyDown={(e) => handleSearch(e)}
    />
  );
};

export default Searchbar;
