import { useState, useEffect, useRef } from "react";
import LoginForm from "../components/LoginForm";
import RegisterForm from "../components/RegisterForm";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";

export default function Login() {
  const [action, setAction] = useState("Login");
  const { status } = useSession();
  const router = useRouter();
  const initialLoad = useRef(true);

  useEffect(() => {
    if (initialLoad.current && status === "authenticated") {
      return router.push("/profile");
    }
    if (initialLoad.current && status === "unauthenticated") {
      initialLoad.current = false;
    }
  }, [status, router, initialLoad]);

  if (status === "unauthenticated") {
    return (
      <div className="flex flex-col text-center p-4 h-screen bg-gray-800 justify-center items-center">
        {action === "Login" && <LoginForm setAction={setAction} />}
        {action === "Register" && <RegisterForm setAction={setAction} />}
      </div>
    );
  }

  return <div className="h-full w-full bg-gray-800"></div>;
}
