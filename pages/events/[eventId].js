import { events } from "./index";
import { IoMdArrowRoundBack } from "react-icons/io";
import { AiOutlineHeart } from "react-icons/ai";
import { BsFillCalendarDateFill } from "react-icons/bs";
import { GoLocation } from "react-icons/go";
import { useRouter } from "next/router";

export default function Event({ event }) {
  const router = useRouter();
  return (
    <div className="flex flex-col h-screen bg-gray-800 text-white">
      <div className="p-4 flex justify-between">
        <IoMdArrowRoundBack
          style={{ cursor: "pointer" }}
          onClick={() => router.back()}
          size="1.5em"
        />
        <AiOutlineHeart
          style={{ cursor: "pointer" }}
          onClick={() => console.log("favorite")}
          size="1.5em"
        />
      </div>
      <div className="w-full h-1/4 bg-gray-400" />
      <div className="flex justify-between p-4">
        <div>
          <h1 className="text-3xl font-semibold">{event.title}</h1>
          <p className="flex items-center text-gray-300">
            <GoLocation className="mr-2" />
            {event.location}
          </p>
        </div>
        <BsFillCalendarDateFill size="2em" />
      </div>
      <p className="text-gray-400 px-4">{event.description}</p>
    </div>
  );
}

export const getServerSideProps = async (context) => {
  const eventId = context.params.eventId;
  const event = events.find((event) => event.id === Number(eventId));

  return {
    props: { event },
  };
};
