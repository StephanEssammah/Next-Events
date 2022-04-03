import { getSession } from "next-auth/react";
import { connectToDatabase } from "../../../utils/db";

export default async function handler(req, res) {
  if (req.method !== "GET") return;
  const session = await getSession({ req });
  const client = await connectToDatabase();
  const eventTitle = req.query.eventTitle;

  const usersCollection = client.db("Storyblok-events").collection("users");
  const eventsCollection = client.db("Storyblok-events").collection("events");

  const userDocument = await usersCollection.findOne({
    email: session.user.email,
  });
  const eventsDocument = await eventsCollection.findOne({
    title: eventTitle,
  });

  const attendants =
    eventsDocument?.attendants === undefined
      ? 0
      : eventsDocument.attendants.length;

  const isFavorite = userDocument.favorites.includes(eventTitle);
  const isAttending = userDocument.events.includes(eventTitle);

  res.status(201).json({ attendants, isFavorite, isAttending });
}
