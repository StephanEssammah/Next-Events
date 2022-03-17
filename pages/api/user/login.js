import { connectToDatabase } from "../../../utils/db";
import { compare } from "bcryptjs";

export default async function handler(req, res) {
  if (req.method !== "POST") return;
  const { email, password } = req.body.inputData;

  const client = await connectToDatabase();
  const collection = client.db("Storyblok-events").collection("users");

  const user = await collection.findOne({ email });
  if (!user) {
    return res.status(422).json({ message: "User not found" });
  }

  const passwordCorrect = await compare(password, user.password);
  if (!passwordCorrect) {
    return res.status(422).json({ message: "Wrong password" });
  }

  console.log("Logged in!");
  res.status(200).json({ message: "Logged in!" });
}
