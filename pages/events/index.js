import Event from "../../components/Event";
import { getSession } from "next-auth/react";
import { connectToDatabase } from "../../utils/db";

export const events = [
  {
    title: "Kickoff Event",
    location: "Oslo",
    description: "Lorum ipsum kickoff event",
    date: new Date("2022-03-22"),
    id: 1,
  },
  {
    title: "Social Event",
    location: "Oslo",
    description: "Lorum ipsum social event",
    date: new Date("2022-04-09"),
    id: 2,
  },
  {
    title: "Another Event",
    location: "Oslo",
    description: "Lorum ipsum another event",
    date: new Date("2022-04-15"),
    id: 3,
  },
];

export default function Events({ favorites }) {
  return (
    <div className="flex flex-col p-4  mb-16 h-full bg-gray-800 text-white">
      {events.map((event, index) =>
        favorites.includes(event.id) ? (
          <Event favorite={true} event={event} key={index} />
        ) : (
          <Event favorite={false} event={event} key={index} />
        )
      )}
    </div>
  );
}

export const getServerSideProps = async (context) => {
  const session = await getSession({ req: context.req });
  const user = session.user.email;

  const client = await connectToDatabase();
  const collection = client.db("Storyblok-events").collection("users");
  const document = await collection.findOne({ email: user });

  return {
    props: { favorites: document.favorites },
  };
};
