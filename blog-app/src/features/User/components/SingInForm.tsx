import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { singInUserService } from "../api";
import { FC, useState } from "react";

type FormData = {
  name: string;
  email: string;
  password: string;
};
type Props = {
  returnToLogin: () => void;
};
export const SignInForm: FC<Props> = ({ returnToLogin }) => {
  const { register, handleSubmit } = useForm<FormData>();
  const [loading, setLoading] = useState<boolean>(false);

  const onSubmit = handleSubmit(async (data) => {
    setLoading(true);
    const res = await singInUserService(data);
    console.log({ res });
    if (!res.success) toast(res.error, { type: "error" });
    else {
      toast("Cuenta creada correctamente", { type: "success" });
      returnToLogin();
    }
    setLoading(false);
  });

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-3">
      <label>Nombre</label>
      <input {...register("name")} className="border-2 border-black p-1" />
      <label>Email</label>
      <input {...register("email")} type="email" className="border-2 border-black p-1" />
      <label>Contraseña</label>
      <input {...register("password")} type="password" className="border-2 border-black p-1" />
      <button
        className="bg-blue-600 text-white py-1 mt-2"
        type="submit"
        disabled={loading}
      >
        Registrar
      </button>
    </form>
  );
};
