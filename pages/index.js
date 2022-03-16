import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";

export default function Home() {
  const router = useRouter();

  return (
    <div className="flex flex-col text-center p-4 h-screen bg-gray-800 text-white justify-center">
      <h1 className="mb-4">Find events close to you</h1>
      <button
        onClick={() => router.push("/events")}
        className="bg-red-400 p-4 mb-4"
      >
        Featured Events
      </button>
      <button className="bg-red-400 p-4 mb-4">All events</button>
    </div>
  );
}
