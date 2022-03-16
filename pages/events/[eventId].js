import { events } from "./index";

export default function Event({ event }) {
  return (
    <div className="flex flex-col p-4 h-screen bg-gray-800 text-white">
      <div className="py-2 flex justify-between bg-gray-700">
        <button>Back</button>
        <button>Fav</button>
      </div>
      <div className="w-full h-1/4 bg-gray-400" />
      <div className="mb-4">
        <h1 className="text-3xl">{event.title}</h1>
        <p>{event.location}</p>
      </div>
      <p className="text-gray-400">{event.description}</p>
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
