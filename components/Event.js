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
      await axios.post("/api/setFavorite", { eventId: event.id });
      setFav(true);
      return;
    }
    setShowModal(true);
  };

  const unFavorite = async (e) => {
    e.stopPropagation();
    await axios.post("/api/unFavorite", { eventId: event.id });
    setFav(false);
  };

  return (
    <>
      {showModal && <Modal setShowModal={setShowModal} />}
      <div
        className="flex justify-between bg-gray-600 mb-4 rounded cursor-pointer relative"
        onClick={() => router.push(`/events/${event.id}`)}
      >
        <div className="w-full h-64 relative">
          <Image
            className="rounded"
            src="https://images.unsplash.com/photo-1621609764095-b32bbe35cf3a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1964&q=80"
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
