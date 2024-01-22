import { useState } from "react";
import { LoginForm } from "../components";
import { SignInForm } from "../components/SingInForm";

export const LoginPage = () => {
  const [formOpt, setFormOpt] = useState<"login" | "sing in">("login");

  return (
    <div className="w-[400px] max-w-full shadow-sm mx-auto mt-8 p-3 bg-white">
      {formOpt === "login" ? (
        <LoginForm />
      ) : (
        <SignInForm returnToLogin={() => setFormOpt("login")} />
      )}
      <span
        className="font-light text-blue-600 cursor-pointer"
        onClick={() => setFormOpt(formOpt === "login" ? "sing in" : "login")}
      >
        {formOpt === "login" ? "Crear una cuenta" : "Iniciar Sesión"}
      </span>
    </div>
  );
};
