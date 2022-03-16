import { useRouter } from "next/router";

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
  const router = useRouter();
  return (
    <div className="flex flex-col p-4 h-screen bg-gray-800 text-white">
      {events.map((event, index) => {
        return (
          <div
            key={index}
            className="flex justify-between bg-gray-600 p-4 mb-4"
            onClick={() => router.push(`/events/${event.id}`)}
          >
            <div>
              <h1>{event.title}</h1>
              <p>{event.location}</p>
            </div>
            <div>
              <p>lo</p>
              <p>go</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
