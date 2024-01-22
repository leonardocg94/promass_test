import { useForm } from "react-hook-form";
import { BlogEntryData } from "../interfaces";
import { FC } from "react";
import { listBlogEntriesService } from "../api";
import { toast } from "react-toastify";

type FormData = {
  searchValue: string;
  searchCriteria: "author" | "title" | "content";
};
type Props = {
  setEntries: (data: BlogEntryData[]) => void;
};
export const BlogSearchBar: FC<Props> = ({ setEntries }) => {
  const { handleSubmit, register } = useForm<FormData>();
  const onSubmit = handleSubmit(async (data) => {
    const res = await listBlogEntriesService(
      data.searchValue
        ? {
            searchCriteria: data.searchCriteria,
            searchValue: data.searchValue,
          }
        : undefined
    );
    if (res.success) setEntries(res.data!.blogEntries);
    else toast(res.error, { type: "error" });
  });

  return (
    <div>
      <form onSubmit={onSubmit} className="flex justify-center gap-4 flex-col md:flex-row">
        <input
          {...register("searchValue")}
          type="text"
          className="p-2 text-xl border-black border-2 md:w-[65%] w-full"
        />
        <select
          {...register("searchCriteria")}
          className="p-2 text-xl border-black border-2 md:w-[20%] w-full"
        >
          <option value="author">Autor</option>
          <option value="title">Título</option>
          <option value="content">Contenido</option>
        </select>
      </form>
    </div>
  );
};
