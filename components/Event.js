import React from "react";
import { useRouter } from "next/router";
import { GoLocation } from "react-icons/go";
import { AiOutlineHeart } from "react-icons/ai";
import { BsFillCalendarDateFill } from "react-icons/bs";

const Event = ({ event }) => {
  const router = useRouter();
  return (
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
        <AiOutlineHeart className="mb-4" size="1.5em" />
        <BsFillCalendarDateFill size="1.5em" />
      </div>
    </div>
  );
};

export default Event;
