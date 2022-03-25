import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";

export default function Home() {
  const router = useRouter();

  return (
    <div className="flex flex-col text-center p-4 h-screen bg-gray-800 text-white justify-center items-center">
      <h1 className="mb-8 text-5xl font-semibold">Find events close to you</h1>
      <button
        onClick={() => router.push("/events")}
        className="bg-red-400 p-4 mb-4 rounded font-medium w-64"
      >
        Featured Events
      </button>
      <button
        className="p-4 mb-4 rounded font-medium w-64"
        style={{
          background: "none",
          border: "4px solid rgb(248 113 113 / var(--tw-bg-opacity))",
        }}
      >
        All events
      </button>
    </div>
  );
}
