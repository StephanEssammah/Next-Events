import React from "react";
import { RiLockPasswordFill } from "react-icons/ri";
import { IoMdMail } from "react-icons/io";
import { useFormik } from "formik";
import { signIn } from "next-auth/react";
import { useRouter } from "next/router";
import Head from "next/head";

const LoginForm = ({ setAction }) => {
  const router = useRouter();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: async (inputData, { resetForm }) => {
      const result = await signIn("credentials", {
        redirect: false,
        email: inputData.email,
        password: inputData.password,
      });
      if (!result.error) router.replace("/");
      resetForm({ inputData: "" });
    },
  });

  return (
    <>
      <Head>
        <title>Login</title>
      </Head>
      <h1 className="text-white mb-4 font-medium text-4xl">Login</h1>
      <form
        onSubmit={formik.handleSubmit}
        className="flex flex-col w-full max-w-md"
      >
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
        <button
          type="submit"
          className="text-white bg-red-400 p-4 rounded-b font-medium"
        >
          Login
        </button>
      </form>
      <p
        className="mt-4 text-gray-400 cursor-pointer"
        onClick={() => setAction("Register")}
      >
        Create Account
      </p>
    </>
  );
};

export default LoginForm;
