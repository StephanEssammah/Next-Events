import { useRouter } from "next/router";
import Head from "next/head";

export default function Home() {
  const router = useRouter();

  return (
    <>
      <Head>
        <title>Home</title>
      </Head>
      <div className="flex flex-col text-center p-4 h-full  text-white justify-center items-center">
        <h1 className="mb-8 text-5xl font-semibold">
          Find events close to you
        </h1>
        <button
          onClick={() => router.push("/events")}
          className="bg-red-400 p-4 mb-4 rounded font-medium w-64"
        >
          Featured Events
        </button>
        <button
          className="p-4 rounded font-medium w-64 border-4 border-red-400"
          onClick={() => router.push("/events")}
        >
          All events
        </button>
      </div>
    </>
  );
}
