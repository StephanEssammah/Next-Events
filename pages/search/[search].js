import React, { useState, useEffect } from "react";
import Searchbar from "../../components/Searchbar";
import Head from "next/head";
import Event from "../../components/Event";
import axios from "axios";
import { useRouter } from "next/router";

export default function Search() {
  const router = useRouter();
  const [events, setEvents] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getEvents = async () => {
      const { data } = await axios.get(`/api/search/${router.query.search}`);
      setEvents(data.events);
      setFavorites(data.favorites);
      setLoading(false);
    };
    getEvents();
  }, [router]);

  return (
    <>
      <Head>
        <title>Search Events</title>
        <meta name="description" content="Search for upcoming events!" />
      </Head>
      <div className="flex flex-col h-full p-4 bg-gray-800 justify-between lg:px-20 items-center">
        <Searchbar />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-4   h-full   text-white content-start max-w-screen-2xl w-full">
          {loading ? (
            <p>Loading...</p>
          ) : (
            events.map((event, index) =>
              favorites.includes(event.title) ? (
                <Event favorite={true} event={event} key={index} />
              ) : (
                <Event favorite={false} event={event} key={index} />
              )
            )
          )}
        </div>
      </div>
    </>
  );
}
