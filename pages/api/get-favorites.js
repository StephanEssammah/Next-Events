import { getSession } from "next-auth/react";
import { connectToDatabase } from "../../utils/db";

export default async function handler(req, res) {
  if (req.method !== "GET") return;
  const session = await getSession({ req });
  const user = session.user.email;

  const client = await connectToDatabase();
  const collection = client.db("Storyblok-events").collection("users");
  const document = await collection.findOne({ email: user });
  const favs = document.favorites;
  res.status(201).json({ favs });
}
