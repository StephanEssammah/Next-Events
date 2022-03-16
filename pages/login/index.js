import { AiOutlineMail } from "react-icons/ai";
import { RiLockPasswordFill } from "react-icons/ri";
import { IoMdMail } from "react-icons/io";

export default function Login() {
  return (
    <div className="flex flex-col text-center p-4 h-screen bg-gray-800 justify-center">
      <h1 className="text-white mb-4 font-medium text-4xl">Login</h1>
      <form className="flex flex-col">
        <div className="flex bg-white items-center p-4 rounded-t border-b-2">
          <IoMdMail className="mr-4" size="1.5em" />
          <input className="w-full" type="email" placeholder="Email" />
        </div>
        <div className="flex bg-white items-center p-4">
          <RiLockPasswordFill className="mr-4" size="1.5em" />
          <input
            className="w-full"
            type="password"
            placeholder="Password"
          ></input>
        </div>
        <button className="text-white bg-red-400 p-4 rounded-br rounded-b font-medium">
          Login
        </button>
      </form>
      <p className="mt-4 text-gray-400">Create Account</p>
    </div>
  );
}
