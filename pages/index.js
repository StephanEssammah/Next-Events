import Head from "next/head";
import Image from "next/image";

export default function Home() {
  return (
    <div className="flex flex-col text-center p-4 h-screen bg-gray-800 text-white justify-center">
      <h1 className="mb-4">Find events close to you</h1>
      <button className="bg-red-400 p-4 mb-4">Featured Events</button>
      <button className="bg-red-400 p-4 mb-4">All events</button>
    </div>
  );
}
