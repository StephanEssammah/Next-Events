import { MongoClient } from "mongodb";

export const connectToDatabase = async () => {
  const client = new MongoClient(process.env.URI);
  await client.connect();
  return client;
};
