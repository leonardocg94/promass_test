import { useState } from "react";
import { useForm } from "react-hook-form";
import { loginUserService } from "../api";
import { toast } from "react-toastify";
import { useAppDispatch } from "../../../common/hooks";
import { login } from "../store";
import { useNavigate } from "react-router-dom";

type FormData = {
  email: string;
  password: string;
};

export const LoginForm = () => {
  const { register, handleSubmit } = useForm<FormData>();
  const [loading, setLoading] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const onSubmit = handleSubmit(async (data) => {
    setLoading(true);
    const res = await loginUserService(data);
    if (!res.success) toast(res.error, { type: "error" });
    else {
      toast("Sesión iniciada", { type: "success" });
      dispatch(login(res.data!.userData));
      navigate("/");
    }
    setLoading(false);
  });

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-3">
      <label>Email</label>
      <input {...register("email")} type="email" className="border-2 border-black p-1" />
      <label>Contraseña</label>
      <input {...register("password")} type="password" className="border-2 border-black p-1" />
      <button
        className="bg-blue-600 text-white py-1 mt-2"
        type="submit"
        disabled={loading}
      >
        Iniciar
      </button>
    </form>
  );
};
