import { useState } from "react";
import { useForm } from "react-hook-form";
import { createBlogEntryService } from "../api";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

type FormData = {
  title: string;
  content: string;
};

export const NewBlogEntryForm = () => {
  const { register, handleSubmit } = useForm<FormData>();
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();

  const onSubmit = handleSubmit(async (data) => {
    setLoading(true);
    const res = await createBlogEntryService(data);
    if (!res.success) toast(res.error, { type: "error" });
    if (res.success) {
      toast("Publicación exitosa", { type: "success" });
      navigate("/");
    }
    setLoading(false);
  });

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-3">
      <label>Titulo</label>
      <input {...register("title")} className="border-2 border-black p-1" />
      <label>Contenido</label>
      <textarea
        {...register("content")}
        className="border-2 border-black p-1 max-h-[300px] min-h-[100px]"
      />
      <button
        className="bg-blue-600 text-white py-1 mt-2"
        type="submit"
        disabled={loading}
      >
        Publicar
      </button>
    </form>
  );
};
