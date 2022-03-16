import React from "react";
import { CgProfile } from "react-icons/cg";
import { AiOutlineHome } from "react-icons/ai";
import { IoMdListBox } from "react-icons/io";
import { useRouter } from "next/router";

const Navbar = () => {
  const router = useRouter();
  return (
    <div className="fixed bottom-0 bg-slate-600 flex w-full p-4 justify-between text-white">
      <AiOutlineHome
        style={{ cursor: "pointer" }}
        onClick={() => router.push("/")}
        size="2em"
      />
      <IoMdListBox
        style={{ cursor: "pointer" }}
        onClick={() => router.push("/events")}
        size="2em"
      />
      <CgProfile
        style={{ cursor: "pointer" }}
        onClick={() => router.push("/login")}
        size="2em"
      />
    </div>
  );
};

export default Navbar;
