import Event from "../../components/Event";
import { getSession } from "next-auth/react";
import { connectToDatabase } from "../../utils/db";
import { getStoryblokContent } from "../../utils/storyblok";
import Searchbar from "../../components/Searchbar";

export default function Events({ favorites, events }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-4 p-4 pb-20 h-full min-h-screen  bg-gray-800 text-white content-start">
      <Searchbar />
      {events.map((event, index) =>
        favorites.includes(event.id) ? (
          <Event favorite={true} event={event} key={index} />
        ) : (
          <Event favorite={false} event={event} key={index} />
        )
      )}
    </div>
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
