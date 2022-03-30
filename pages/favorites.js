import React from "react";
import { useRouter } from "next/router";
import { getSession } from "next-auth/react";
import Event from "../components/Event";
import { connectToDatabase } from "../utils/db";
import { getStoryblokContent } from "../utils/storyblok";
import MobileNav from "../components/MobileNav";
import DesktopNav from "../components/DesktopNav";

const Favorites = ({ session, favorites, events }) => {
  const router = useRouter();

  if (!session) {
    return (
      <>
        <div className="flex flex-col text-center p-4 h-screen bg-gray-800 text-white justify-center items-center">
          <h1 className="mb-2 text-5xl font-semibold">Favorites</h1>
          <p className="mb-8">Login or signup to access favorites!</p>
          <button
            onClick={() => router.push("/login")}
            className="bg-red-400 p-4 mb-4 rounded font-medium w-full max-w-xs"
          >
            Go to login page
          </button>
        </div>
        <MobileNav />
      </>
    );
  }

  return (
    <div className="flex flex-col h-screen">
      <DesktopNav />
      <div className="flex flex-col p-4 h-full bg-gray-800 text-white lg:px-20">
        <h1 className="mb-4 text-5xl font-semibold">Favorites</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-4">
          {events.map((event, index) => {
            if (favorites.includes(event._uid))
              return <Event favorite={true} event={event} key={index} />;
          })}
        </div>
      </div>
      <MobileNav />
    </div>
  );
};

export default Favorites;

export const getServerSideProps = async (context) => {
  const session = await getSession({ req: context.req });
  const events = await getStoryblokContent();

  if (!session) {
    return {
      props: {},
    };
  }

  const user = session.user.email;
  const client = await connectToDatabase();
  const collection = client.db("Storyblok-events").collection("users");
  const document = await collection.findOne({ email: user });

  return {
    props: {
      session: session,
      favorites: document.favorites,
      events: events,
    },
  };
};
