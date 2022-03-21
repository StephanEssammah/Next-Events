import { useState } from "react";
import LoginForm from "../../components/LoginForm";
import RegisterForm from "../../components/RegisterForm";
import { getSession } from "next-auth/react";

export default function Login() {
  const [action, setAction] = useState("Login");

  return (
    <div className="flex flex-col text-center p-4 h-screen bg-gray-800 justify-center">
      {action === "Login" && <LoginForm setAction={setAction} />}
      {action === "Register" && <RegisterForm setAction={setAction} />}
    </div>
  );
}

export const getServerSideProps = async (context) => {
  const session = await getSession({ req: context.req });

  if (session)
    return {
      redirect: {
        destination: "/profile",
        permanent: false,
      },
    };

  return {
    props: {},
  };
};
