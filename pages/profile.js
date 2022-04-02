import React from "react";
import { signOut } from "next-auth/react";
import { getSession } from "next-auth/react";
import { FaEdit } from "react-icons/fa";
import Head from "next/head";

const Profile = ({ session }) => {
  const handleSignout = async () => {
    signOut({ callbackUrl: "http://localhost:3000/login" });
  };

  return (
    <>
      <Head>
        <title>Profile</title>
      </Head>
      <div className="flex flex-col p-4 h-full items-center bg-gray-800 text-white justify-between lg:px-20 sm:justify-center">
        <div className="w-full max-w-md sm:p-4 sm:bg-white sm:bg-opacity-10 sm:mb-8 rounded">
          <div className="flex justify-between items-center mb-8">
            <h1 className="mb-2 text-5xl font-semibold">Profile</h1>
            <FaEdit size="2em" />
          </div>
          <div>
            <div className="mb-4">
              <p className="">Email:</p>
              <p className="text-white text-opacity-50">{session.user.email}</p>
            </div>
            <div className="mb-4">
              <p className="">Display Name:</p>
              <p className="text-white text-opacity-50">Display name</p>
            </div>
          </div>
        </div>
        <button
          onClick={handleSignout}
          className="bg-red-400 p-4 rounded font-medium w-full max-w-md"
        >
          Sign out
        </button>
      </div>
    </>
  );
};

export default Profile;

export const getServerSideProps = async (context) => {
  const session = await getSession({ req: context.req });

  if (!session)
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };

  return {
    props: { session },
  };
};
