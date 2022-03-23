import React from "react";
import { useRouter } from "next/router";

const Modal = ({ setShowModal }) => {
  const router = useRouter();

  const goToLoginPage = (e) => {
    e.stopPropagation();
    router.push("/login");
  };

  return (
    <div
      onClick={() => setShowModal(false)}
      className="inset-0 absolute bg-black bg-opacity-70 flex justify-center items-center z-20"
    >
      <div className="bg-white rounded ">
        <h1 onClick={(e) => e.stopPropagation()} className="text-black  p-4">
          Register or login to unlock this feature.
        </h1>
        <div>
          <button className="text-white bg-gray-400 p-4 rounded-bl font-medium w-1/2">
            Cancel
          </button>
          <button
            onClick={goToLoginPage}
            className="text-white bg-red-400 p-4 rounded-br font-medium w-1/2"
          >
            Login
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
