import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getBlogEntryService, toggleBlogEntryLikeService } from "../api";
import { toast } from "react-toastify";
import { BlogEntryData } from "../interfaces";
import dayjs from "dayjs";
import { useAppSelector } from "../../../common/hooks";

export const BlogEntryPage = () => {
  const { isLogged } = useAppSelector((state) => state.auth);
  const { blogEntryId } = useParams<{ blogEntryId: string }>();
  const navigate = useNavigate();
  const [entry, setEntry] = useState<BlogEntryData>();
  const [liked, setLiked] = useState<boolean>(false);

  if (!blogEntryId) navigate("/");

  const likeHandler = async () => {
    if (!isLogged) {
      toast("Tienes que iniciar sesión para dar like a una publicación", {
        type: "error",
      });
      return;
    }
    const res = await toggleBlogEntryLikeService(blogEntryId as string);
    if (!res.success) toast(res.error, { type: "error" });
    if (res.success) {
      toast("Acción exitosa", { type: "success" });
      setLiked((prevState) => !prevState);
    }
  };

  useEffect(() => {
    (async () => {
      const res = await getBlogEntryService(blogEntryId as string);
      if (!res.success) toast(res.error, { type: "error" });
      if (res.success) {
        setLiked(res.data!.liked);
        setEntry(res.data!.blogEntry);
      }
    })();
  }, []);

  if (!entry)
    return (
      <div className="max-w-full shadow-sm mx-auto mt-8 p-3 bg-white">
        <h3>Cargando...</h3>
      </div>
    );

  return (
    <div className="max-w-full shadow-sm mx-auto mt-8 p-3 bg-white">
      <h3 className="font-semibold text-3xl">{entry.title}</h3>
      <div className="flex gap-4 text-lg items-center flex-wrap">
        <p>{entry.author.name}</p>
        <p>{dayjs(entry.createdAt).format("DD/MM/YYYY")}</p>
        <button
          className={`py-1 px-3 rounded-lg text-white cursor-pointer ${
            liked ? "bg-blue-600" : "bg-gray-400"
          }`}
          onClick={likeHandler}
        >
          Me gusta
        </button>
      </div>
      <p className="mt-3 text-xl leading-8">{entry.content}</p>
    </div>
  );
};
