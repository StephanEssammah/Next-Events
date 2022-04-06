import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import Event from "../components/Event";
import Head from "next/head";
import axios from "axios";

const Favorites = () => {
  const router = useRouter();
  const { data: session, status } = useSession();
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getEvents = async () => {
      const { data } = await axios.get("/api/get-favorite-events");
      setEvents(data.favoriteEvents);
      setLoading(false);
    };

    if (status === "authenticated") {
      getEvents();
    }
  }, [status]);

  if (status === "loading") {
    return (
      <>
        <Head>
          <title>Favorites</title>
        </Head>
        <div className="flex flex-col text-center p-4 h-full bg-gray-800 text-white justify-center items-center"></div>
      </>
    );
  }

  if (status === "unauthenticated") {
    return (
      <>
        <Head>
          <title>Favorites</title>
        </Head>
        <div className="flex flex-col text-center p-4 h-full bg-gray-800 text-white justify-center items-center">
          <h1 className="mb-2 text-5xl font-semibold">Favorites</h1>
          <p className="mb-8">Login or signup to access favorites!</p>
          <button
            onClick={() => router.push("/login")}
            className="bg-red-400 p-4 mb-4 rounded font-medium w-full max-w-xs"
          >
            Go to login page
          </button>
        </div>
      </>
    );
  }

  return (
    <>
      <Head>
        <title>Favorites</title>
      </Head>
      <div className="flex flex-col p-4 h-full bg-gray-800 text-white lg:px-20 items-center">
        <div className="w-full max-w-screen-2xl">
          <h1 className="mb-4 text-5xl font-semibold">Favorites</h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-4">
            {loading ? (
              <p>Loading...</p>
            ) : (
              events.map((event, index) => {
                return <Event favorite={true} event={event} key={index} />;
              })
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Favorites;
