import React from "react";
import { FaUserFriends } from "react-icons/fa";

const Attendants = ({ attendants }) => {
  const string = attendants === 1 ? "person attending" : "people attending";

  return (
    <p className="flex items-center text-gray-300">
      <FaUserFriends className="mr-2" />
      {attendants} {string}
    </p>
  );
};

export default Attendants;
