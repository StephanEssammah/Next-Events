import React from "react";
import { RiLockPasswordFill } from "react-icons/ri";
import { IoMdMail } from "react-icons/io";
import { useFormik } from "formik";
import axios from "axios";

const RegisterForm = ({ setAction }) => {
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      passwordRepeat: "",
    },
    onSubmit: async (inputData, { resetForm }) => {
      const res = await axios.post(
        "/api/user/register",
        { inputData },
        { validateStatus: () => true }
      );
      console.log(res.data.message);
      resetForm({ passwords: "" });
    },
  });
  return (
    <>
      <h1 className="text-white mb-4 font-medium text-4xl">
        Create an account
      </h1>
      <form onSubmit={formik.handleSubmit} className="flex flex-col">
        <div className="flex bg-white items-center p-4 rounded-t border-b-2">
          <IoMdMail className="mr-4" size="1.5em" />
          <input
            value={formik.values.email}
            onChange={formik.handleChange}
            id="email"
            className="w-full"
            type="email"
            placeholder="Email"
          />
        </div>
        <div className="flex bg-white items-center p-4">
          <RiLockPasswordFill className="mr-4" size="1.5em" />
          <input
            value={formik.values.password}
            onChange={formik.handleChange}
            id="password"
            className="w-full"
            type="password"
            placeholder="Password"
          ></input>
        </div>
        <div className="flex bg-white items-center p-4 border-t-2">
          <RiLockPasswordFill className="mr-4" size="1.5em" />
          <input
            value={formik.values.passwordRepeat}
            onChange={formik.handleChange}
            id="passwordRepeat"
            className="w-full"
            type="password"
            placeholder="Repeat Password"
          ></input>
        </div>

        <button
          type="submit"
          className="text-white bg-red-400 p-4 rounded-br rounded-b font-medium"
        >
          Register
        </button>
      </form>
      <p
        className="mt-4 text-gray-400 cursor-pointer"
        onClick={() => setAction("Login")}
      >
        Login
      </p>
    </>
  );
};

export default RegisterForm;
