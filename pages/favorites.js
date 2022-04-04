import React from "react";
import { useRouter } from "next/router";
import { getSession } from "next-auth/react";
import Event from "../components/Event";
import { connectToDatabase } from "../utils/db";
import { getStoryblokContent } from "../utils/storyblok";
import Head from "next/head";

const Favorites = ({ session, favorites, events }) => {
  const router = useRouter();

  if (!session) {
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
            {events.map((event, index) => {
              if (favorites.includes(event.title))
                return <Event favorite={true} event={event} key={index} />;
            })}
          </div>
        </div>
      </div>
    </>
  );
};

export default Favorites;

export const getServerSideProps = async (context) => {
  const session = await getSession({ req: context.req });
  if (!session) {
    return {
      props: {},
    };
  }

  const events = await getStoryblokContent();
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
