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
      className="p-2 rounded bg-white bg-opacity-10 border-gray-500 border"
      value={search}
      onChange={(e) => setSearch(e.target.value)}
      onKeyDown={(e) => handleSearch(e)}
    />
  );
};

export default Searchbar;