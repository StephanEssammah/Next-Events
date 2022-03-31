import React from "react";
import Attendants from "./Attendants";
import Calendar from "./Calendar";
import { GoLocation } from "react-icons/go";

const EventDetailsDesktop = ({ event, attendants }) => {
  return (
    <div className="hidden w-full justify-between bg-gradient-to-t from-gray-800 via-gray-800 lg:flex">
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
  );
};

export default EventDetailsDesktop;
