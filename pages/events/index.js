import Event from "../../components/Event";
import { getSession } from "next-auth/react";
import { connectToDatabase } from "../../utils/db";
import { getStoryblokContent } from "../../utils/storyblok";
import Searchbar from "../../components/Searchbar";
import Head from "next/head";

export default function Events({ favorites, events }) {
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
            favorites.includes(event.title) ? (
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
  const events = await getStoryblokContent();

  if (!session) {
    return {
      props: {
        favorites: [],
        events: events,
      },
    };
  }

  const user = session.user.email;
  const client = await connectToDatabase();
  const collection = client.db("Storyblok-events").collection("users");
  const document = await collection.findOne({ email: user });

  return {
    props: {
      favorites: document.favorites,
      events: events,
    },
  };
};
