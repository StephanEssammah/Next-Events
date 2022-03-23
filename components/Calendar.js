import React from "react";

const Calendar = ({ date }) => {
  const dateObject = new Date(date);
  const month = dateObject.toLocaleDateString("en-GB", { month: "short" });
  const day = dateObject.toLocaleDateString("en-GB", { day: "numeric" });

  return (
    <div className="bg-white h-12 w-12 my-0 flex flex-col items-center justify-center rounded-xl">
      <h1 className="text-black font-bold leading-none">{day}</h1>
      <p className="text-red-600 font-semibold text-xs">{month}</p>
    </div>
  );
};

export default Calendar;
