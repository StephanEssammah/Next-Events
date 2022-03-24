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

export default function Event({ event, favorite }) {
  const router = useRouter();
  const [fav, setFav] = useState(favorite);
  const [showModal, setShowModal] = useState(false);
  const session = useSession();

  const setFavorite = async (e) => {
    if (session.status === "authenticated") {
      console.log("unfav");
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
          </div>
          <Calendar date={event.date} />
        </div>
      </div>
      <p className="text-gray-400 px-4">{event.description}</p>
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
  const collection = client.db("Storyblok-events").collection("users");
  const document = await collection.findOne({ email: user });
  const isFavorite = document.favorites.includes(eventId);

  return {
    props: {
      event: event,
      favorite: isFavorite,
    },
  };
};
