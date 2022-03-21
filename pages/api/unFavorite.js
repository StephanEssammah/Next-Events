import { getSession } from "next-auth/react";
import { connectToDatabase } from "../../utils/db";

export default async function handler(req, res) {
  if (req.method !== "POST") return;
  const session = await getSession({ req });
  const user = session.user.email;
  const { eventId } = req.body;

  const client = await connectToDatabase();
  const collection = client.db("Storyblok-events").collection("users");
  await collection.updateOne(
    { email: user },
    { $pull: { favorites: eventId } },
    { upsert: true }
  );

  res.status(201).json({ message: "Favorite removed!" });
}
