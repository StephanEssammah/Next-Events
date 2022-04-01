import Event from "../../components/Event";
import { getSession } from "next-auth/react";
import { connectToDatabase } from "../../utils/db";
import { getStoryblokContent } from "../../utils/storyblok";
import Searchbar from "../../components/Searchbar";
import Head from "next/head";

export default function Search({ favorites, events }) {
  return (
    <>
      <Head>
        <title>Search Events</title>
        <meta name="description" content="Search for upcoming events!" />
      </Head>
      <div className="flex flex-col h-full p-4 bg-gray-800 justify-between lg:px-20">
        <Searchbar />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-4   h-full   text-white content-start">
          {events.map((event, index) =>
            favorites.includes(event.id) ? (
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

export const getServerSideProps = async (context) => {
  const session = await getSession({ req: context.req });
  const allEvents = await getStoryblokContent();
  const matchingEvents = allEvents.filter((event, index) => {
    if (index >= 9) return false;
    return event.title
      .toLowerCase()
      .includes(context.query.search.toLowerCase());
  });

  if (!session) {
    return {
      props: {
        favorites: [],
        events: matchingEvents,
      },
    };
  }

  const client = await connectToDatabase();
  const collection = client.db("Storyblok-events").collection("users");
  const userDocument = await collection.findOne({ email: session.user.email });

  return {
    props: {
      favorites: userDocument.favorites,
      events: matchingEvents,
    },
  };
};
