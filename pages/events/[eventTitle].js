import { useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { getSession } from "next-auth/react";
import axios from "axios";
import Image from "next/image";
import Modal from "../../components/Modal";
import { connectToDatabase } from "../../utils/db";
import { IoMdArrowRoundBack } from "react-icons/io";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";

import { getStoryblokContent } from "../../utils/storyblok";
import EventDetailsMobile from "../../components/EventDetailsMobile";
import EventDetailsDesktop from "../../components/EventDetailsDesktop";
import Head from "next/head";

export default function Event({ event, favorite, isAttending, attendants }) {
  const router = useRouter();
  const [fav, setFav] = useState(favorite);
  const [showModal, setShowModal] = useState(false);
  const [attendStatus, setAttendStatus] = useState(
    isAttending ? "Attending ✔" : "Attend"
  );
  const session = useSession();

  const clickAttend = async () => {
    if (attendStatus === "Attend") {
      await axios.post("/api/attend-event", { event: event });
      setAttendStatus("Attending ✔");
      return;
    }
    await axios.post("/api/leave-event", { event: event });
    setAttendStatus("Attend");
  };

  const setFavorite = async (e) => {
    if (session.status === "authenticated") {
      await axios.post("/api/setFavorite", { eventTitle: event.title });
      setFav(true);
      return;
    }
    setShowModal(true);
  };

  const unFavorite = async (e) => {
    await axios.post("/api/unFavorite", { eventTitle: event.title });
    setFav(false);
  };

  return (
    <>
      <Head>
        <title>{event.title}</title>
        <meta name="description" content={event.description} />
      </Head>
      <div className="flex flex-col max-w-7xl bg-gray-800 text-white lg:px-16 lg:grid grid-cols-2 lg:items-center lg:align-center my-0 mx-auto lg:mt-24">
        {showModal && <Modal setShowModal={setShowModal} />}
        <div className="w-full h-96 bg-gray-400 relative lg:rounded lg:mt-8">
          <Image
            className="lg:rounded"
            src={event.image}
            alt={event.title}
            layout="fill"
            objectFit="cover"
          />
          <div className="absolute w-full p-4 flex justify-between bg-gradient-to-b from-black z-10 lg:rounded">
            <IoMdArrowRoundBack
              className="drop-shadow cursor-pointer"
              onClick={() => router.back()}
              size="2em"
            />
            {fav ? (
              <AiFillHeart
                onClick={unFavorite}
                className="drop-shadow cursor-pointer"
                size="2em"
              />
            ) : (
              <AiOutlineHeart
                onClick={setFavorite}
                className="drop-shadow cursor-pointer"
                size="2em"
              />
            )}
          </div>
          <EventDetailsMobile event={event} attendants={attendants} />
        </div>
        <div className="p-4">
          <EventDetailsDesktop event={event} attendants={attendants} />
          <p className="text-gray-400">{event.description}</p>
          <button
            onClick={clickAttend}
            className="bg-red-400 p-4 rounded font-medium mt-8 max-w-sm w-full"
          >
            {attendStatus}
          </button>
        </div>
      </div>
    </>
  );
}

export const getServerSideProps = async (context) => {
  const eventTitle = context.params.eventTitle;
  const events = await getStoryblokContent();
  const event = events.find((event) => event.title === eventTitle);

  const session = await getSession({ req: context.req });
  if (!session) {
    return {
      props: { event },
    };
  }

  const user = session.user.email;
  const client = await connectToDatabase();
  const usersCollection = client.db("Storyblok-events").collection("users");
  const eventsCollection = client.db("Storyblok-events").collection("events");

  const userDocument = await usersCollection.findOne({ email: user });
  const eventsDocument = await eventsCollection.findOne({
    eventId: event._uid,
  });

  const attendants =
    eventsDocument?.attendants === undefined
      ? 0
      : eventsDocument.attendants.length;

  const isFavorite = userDocument.favorites.includes(eventTitle);
  const isAttending = userDocument.events.includes(event._uid);

  return {
    props: {
      event: event,
      favorite: isFavorite,
      isAttending: isAttending,
      attendants: attendants,
    },
  };
};
