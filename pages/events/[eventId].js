import { useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { getSession } from "next-auth/react";
import axios from "axios";
import Image from "next/image";
import Calendar from "../../components/Calendar";
import Modal from "../../components/Modal";
import { connectToDatabase } from "../../utils/db";
import { IoMdArrowRoundBack } from "react-icons/io";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { GoLocation } from "react-icons/go";
import { getStoryblokContent } from "../../utils/storyblok";
import Attendants from "../../components/Attendants";

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
      await axios.post("/api/setFavorite", { eventId: event.id });
      setFav(true);
      return;
    }
    setShowModal(true);
  };

  const unFavorite = async (e) => {
    await axios.post("/api/unFavorite", { eventId: event.id });
    setFav(false);
  };

  return (
    <div className="flex flex-col h-screen bg-gray-800 text-white">
      {showModal && <Modal setShowModal={setShowModal} />}
      <div className="absolute w-full p-4 flex justify-between bg-gradient-to-b from-black z-10">
        <IoMdArrowRoundBack
          style={{ cursor: "pointer" }}
          onClick={() => router.back()}
          size="2em"
        />
        {fav ? (
          <AiFillHeart
            onClick={unFavorite}
            className="drop-shadow"
            size="2em"
          />
        ) : (
          <AiOutlineHeart
            onClick={setFavorite}
            style={{ cursor: "pointer" }}
            size="2em"
          />
        )}
      </div>
      <div className="w-full h-2/5 bg-gray-400 relative">
        <Image
          className="rounded"
          src={event.image}
          alt={event.title}
          layout="fill"
          objectFit="cover"
        />
        <div className="absolute w-full bottom-0 flex justify-between p-4 bg-gradient-to-t from-gray-800 via-gray-800">
          <div>
            <h1 className="text-3xl font-semibold">{event.title}</h1>
            <p className="flex items-center text-gray-300">
              <GoLocation className="mr-2" />
              {event.location}
            </p>
            {attendants > 0 && <Attendants attendants={attendants} />}
          </div>
          <Calendar date={event.date} />
        </div>
      </div>
      <p className="text-gray-400 px-4">{event.description}</p>
      <button
        onClick={clickAttend}
        className="bg-red-400 p-4 rounded font-medium my-8 mx-4 max-w-md"
      >
        {attendStatus}
      </button>
    </div>
  );
}

export const getServerSideProps = async (context) => {
  const eventId = context.params.eventId;
  const events = await getStoryblokContent();
  const event = events.find((event) => event._uid === eventId);

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

  const isFavorite = userDocument.favorites.includes(eventId);
  const isAttending = userDocument.events.includes(eventId);

  return {
    props: {
      event: event,
      favorite: isFavorite,
      isAttending: isAttending,
      attendants: attendants,
    },
  };
};
