import Event from "../../components/Event";
import { getStoryblokContent } from "../../utils/storyblok";
import Searchbar from "../../components/Searchbar";
import Head from "next/head";
import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";
import axios from "axios";

export default function Events({ events }) {
  const [favs, setFavs] = useState([]);
  const { status } = useSession();

  useEffect(() => {
    const getFavorites = async () => {
      const { data } = await axios.get("/api/get-favorites");
      setFavs(data.favs);
    };
    if (status === "authenticated") getFavorites();
  }, [status]);

  return (
    <>
      <Head>
        <title>Events</title>
        <meta
          name="description"
          content="Find popular upcoming events, near your location!"
        />
      </Head>
      <div className="flex flex-col p-4 bg-gray-800   text-white content-start lg:px-20">
        <Searchbar />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-4">
          {events.map((event, index) =>
            favs.includes(event.title) ? (
              <Event favorite={true} event={event} key={index} />
            ) : (
              <Event favorite={false} event={event} key={index} />
            )
          )}
        </div>
      </div>
    </>
  );
}

export const getStaticProps = async () => {
  const events = await getStoryblokContent();
  return {
    props: {
      events: events,
    },
  };
};
