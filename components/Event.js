import React, { useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import axios from "axios";
import Modal from "./Modal";
import Image from "next/image";
import { GoLocation } from "react-icons/go";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import Calendar from "./Calendar";

const Event = ({ event, favorite }) => {
  const router = useRouter();
  const session = useSession();
  const [fav, setFav] = useState(favorite);
  const [showModal, setShowModal] = useState(false);

  const setFavorite = async (e) => {
    e.stopPropagation();
    if (session.status === "authenticated") {
      await axios.post("/api/setFavorite", { eventId: event._uid });
      setFav(true);
      return;
    }
    setShowModal(true);
  };

  const unFavorite = async (e) => {
    e.stopPropagation();
    await axios.post("/api/unFavorite", { eventId: event._uid });
    setFav(false);
  };

  return (
    <>
      {showModal && <Modal setShowModal={setShowModal} />}
      <div
        className="flex justify-between bg-gray-600  rounded cursor-pointer relative w-full h-full"
        onClick={() => router.push(`/events/${event._uid}`)}
      >
        <div className="w-full h-64 relative">
          <Image
            className="rounded"
            src={event.image}
            alt={event.title}
            layout="fill"
            objectFit="cover"
          />
        </div>
        <div className="flex justify-between absolute bottom-0 bg-gradient-to-t from-black p-4 pt-12 w-full rounded">
          <div className="">
            <h1 className="font-semibold text-2xl">{event.title}</h1>
            <div className="flex items-center text-gray-300">
              <GoLocation className="mr-2" />
              <p>{event.location}</p>
            </div>
          </div>
          <Calendar date={event.date} />
        </div>
        <div className="absolute right-0 p-4">
          {fav ? (
            <AiFillHeart
              onClick={unFavorite}
              className="drop-shadow"
              size="2em"
            />
          ) : (
            <AiOutlineHeart
              onClick={setFavorite}
              className="drop-shadow"
              size="2em"
            />
          )}
        </div>
      </div>
    </>
  );
};

export default Event;
