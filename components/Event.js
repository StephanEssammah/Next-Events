import React, { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import axios from "axios";
import Modal from "./Modal";
import { GoLocation } from "react-icons/go";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { BsFillCalendarDateFill } from "react-icons/bs";

const Event = ({ event, favorite }) => {
  const router = useRouter();
  const session = useSession();
  const [fav, setFav] = useState(favorite);
  const [showModal, setShowModal] = useState(false);

  const setFavorite = async (e) => {
    e.stopPropagation();
    if (session.status === "authenticated") {
      await axios.post("/api/setFavorite");
      setFav(true);
      return;
    }
    setShowModal(true);
  };

  const unFavorite = async (e) => {
    e.stopPropagation();
    await axios.post("/api/unFavorite");
    setFav(false);
  };

  return (
    <>
      {showModal && <Modal setShowModal={setShowModal} />}
      <div
        className="flex justify-between bg-gray-600 p-4 mb-4 rounded cursor-pointer"
        onClick={() => router.push(`/events/${event.id}`)}
      >
        <div>
          <h1 className="font-semibold text-2xl mb-2">{event.title}</h1>
          <div className="flex items-center text-gray-300">
            <GoLocation className="mr-2" />
            <p>{event.location}</p>
          </div>
        </div>
        <div>
          {fav ? (
            <AiFillHeart onClick={unFavorite} className="mb-4" size="1.5em" />
          ) : (
            <AiOutlineHeart
              onClick={setFavorite}
              className="mb-4"
              size="1.5em"
            />
          )}

          <BsFillCalendarDateFill size="1.5em" />
        </div>
      </div>
    </>
  );
};

export default Event;
