import React from "react";
import { useRouter } from "next/router";
import { signOut } from "next-auth/react";
import { getSession } from "next-auth/react";

const Profile = () => {
  const handleSignout = async () => {
    signOut({ callbackUrl: "http://localhost:3000/login" });
  };

  return (
    <div className="flex flex-col p-4 pb-20 h-screen bg-gray-800 text-white justify-between">
      <h1 className="mb-2 text-5xl font-semibold">Profile</h1>
      <div>
        <div className="mb-4">
          <p className="">Email:</p>
          <p className="text-white text-opacity-50">
            stephan.essammah@appliedtechnology.se
          </p>
        </div>
        <div className="mb-4">
          <p className="">Display Name:</p>
          <p className="text-white text-opacity-50">Stephan Essammah</p>
        </div>
      </div>
      <button
        onClick={handleSignout}
        className="bg-red-400 p-4 mb-4 rounded font-medium"
      >
        Sign out
      </button>
    </div>
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
