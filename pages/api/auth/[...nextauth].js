import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { compare } from "bcryptjs";
import { connectToDatabase } from "../../../utils/db";

export default NextAuth({
  session: {
    jwt: true,
  },
  providers: [
    CredentialsProvider({
      async authorize(credentials) {
        const client = await connectToDatabase();
        const collection = client.db("Storyblok-events").collection("users");

        const user = await collection.findOne({ email: credentials.email });
        if (!user) throw new Error("User not found.");

        const passwordCorrect = await compare(
          credentials.password,
          user.password
        );
        if (!passwordCorrect) throw new Error("Wrong password.");

        client.close();
        return { email: user.email };
      },
    }),
  ],
});
