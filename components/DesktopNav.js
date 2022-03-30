import React, { useState } from "react";
import { CgProfile } from "react-icons/cg";
import { AiOutlineHome, AiOutlineHeart } from "react-icons/ai";
import { IoMdListBox } from "react-icons/io";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import Searchbar from "./Searchbar";
import Link from "next/link";

const DesktopNav = () => {
  const router = useRouter();
  const session = useSession();
  const [search, setSearch] = useState("");

  const handleSearch = (e) => {
    if (e.keyCode === 13) router.push(`/search/${search}`);
  };

  return (
    <div className="sticky top-0 z-10 bg-slate-600 hidden w-full py-2 px-20 justify-between items-center  text-white lg:flex">
      <div className="flex gap-8 font-bold">
        <Link href="/">
          <a className="hover:text-red-400">Home</a>
        </Link>
        <Link href="/events">
          <a className="hover:text-red-400">Events</a>
        </Link>
        <Link href="/favorites">
          <a className="hover:text-red-400">Favorites</a>
        </Link>
        <Link href={session.status === "authenticated" ? "/profile" : "/login"}>
          <a className="hover:text-red-400">
            {session.status === "authenticated" ? "Profile" : "Login"}
          </a>
        </Link>
      </div>
      <input
        type="text"
        placeholder="Search"
        className="p-2 rounded bg-white bg-opacity-20 border-gray-400 border"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        onKeyDown={(e) => handleSearch(e)}
      />
    </div>
  );
};

export default DesktopNav;
