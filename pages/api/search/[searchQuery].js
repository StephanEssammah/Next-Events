import { getSession } from "next-auth/react";
import { connectToDatabase } from "../../../utils/db";
import { getStoryblokContent } from "../../../utils/storyblok";

export default async function handler(req, res) {
  if (req.method !== "GET") return;

  const session = await getSession({ req });
  const allEvents = await getStoryblokContent();
  const matchingEvents = allEvents.filter((event, index) => {
    if (index >= 9) return false;
    return event.title
      .toLowerCase()
      .includes(req.query.searchQuery.toLowerCase());
  });

  if (!session) {
    return res.status(201).json({ events: matchingEvents, favorites: [] });
  }

  const user = session.user.email;
  const client = await connectToDatabase();
  const collection = client.db("Storyblok-events").collection("users");
  const document = await collection.findOne({ email: user });
  const favs = document.favorites;

  res.status(201).json({ events: matchingEvents, favorites: favs });
}
