import { getSession } from "next-auth/react";
import { connectToDatabase } from "../../utils/db";

export default async function handler(req, res) {
  if (req.method !== "POST") return;
  const session = await getSession({ req });
  const user = session.user.email;
  const { event } = req.body;

  const client = await connectToDatabase();
  const eventCollection = client.db("Storyblok-events").collection("events");
  const userCollection = client.db("Storyblok-events").collection("users");

  await eventCollection.updateOne(
    { eventId: event._uid, title: event.title },
    { $pull: { attendants: user } }
  );

  await userCollection.updateOne(
    { email: user },
    { $pull: { events: event.title } }
  );

  res.status(201).json({ message: "Left event" });
}
