import { useState } from "react";
import LoginForm from "../../components/LoginForm";
import RegisterForm from "../../components/RegisterForm";

export default function Login() {
  const [action, setAction] = useState("Login");

  return (
    <div className="flex flex-col text-center p-4 h-screen bg-gray-800 justify-center">
      {action === "Login" && <LoginForm setAction={setAction} />}
      {action === "Register" && <RegisterForm setAction={setAction} />}
    </div>
  );
}
