import React from "react";
import { useRouter } from "next/router";
import Event from "../components/Event";
import { events } from "./events";

const Favorites = () => {
  const router = useRouter();
  const loggedIn = true;

  if (!loggedIn) {
    return (
      <div className="flex flex-col text-center p-4 h-screen bg-gray-800 text-white justify-center">
        <h1 className="mb-2 text-5xl font-semibold">Favorites</h1>
        <p className="mb-8">Login or signup to access favorites!</p>
        <button
          onClick={() => router.push("/login")}
          className="bg-red-400 p-4 mb-4 rounded font-medium"
        >
          Go to login page
        </button>
      </div>
    );
  }

  if (loggedIn)
    return (
      <div className="flex flex-col p-4 h-screen bg-gray-800 text-white">
        {events.map((event, index) => (
          <Event event={event} key={index} />
        ))}
      </div>
    );
};

export default Favorites;
