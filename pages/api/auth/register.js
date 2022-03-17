import { connectToDatabase } from "../../../utils/db";
import { hash } from "bcryptjs";

export default async function handler(req, res) {
  const { email, password, passwordRepeat } = req.body.inputData;

  if (req.method !== "POST") return;

  if (password !== passwordRepeat) {
    return res.status(422).json({ message: "Passwords didn't match." });
  }

  const client = await connectToDatabase();
  const collection = client.db("Storyblok-events").collection("users");

  const userAlreadyExists = await collection.findOne({ email });
  if (userAlreadyExists) {
    return res.status(422).json({ message: "Email already used." });
  }

  const hashedPassword = await hash(password, 10);
  await collection.insertOne({
    email,
    password: hashedPassword,
  });

  res.status(201).json({ message: "User created!" });
}
