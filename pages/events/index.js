import Event from "../../components/Event";

export const events = [
  {
    title: "Kickoff Event",
    location: "Oslo",
    description: "Lorum ipsum kickoff event",
    id: 1,
  },
  {
    title: "Social Event",
    location: "Oslo",
    description: "Lorum ipsum social event",
    id: 2,
  },
  {
    title: "Another Event",
    location: "Oslo",
    description: "Lorum ipsum another event",
    id: 3,
  },
];

export default function Events() {
  return (
    <div className="flex flex-col p-4 h-screen bg-gray-800 text-white">
      {events.map((event, index) => (
        <Event event={event} key={index} />
      ))}
    </div>
  );
}
