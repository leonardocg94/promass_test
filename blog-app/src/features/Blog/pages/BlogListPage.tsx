import { useEffect, useState } from "react";
import { BlogList, BlogSearchBar } from "../components";
import { listBlogEntriesService } from "../api";
import { useAppSelector } from "../../../common/hooks";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { BlogEntryData } from "../interfaces";

export const BlogListPage = () => {
  const [entries, setEntries] = useState<BlogEntryData[]>([]);
  const { isLogged } = useAppSelector((state) => state.auth);
  const navigate = useNavigate();

  const publishHandler = () => {
    if (!isLogged) {
      toast("Para publicar inicia sesión primero", { type: "info" });
      navigate("/login");
      return;
    }

    navigate("/createBlogEntry");
  };

  useEffect(() => {
    (async () => {
      const res = await listBlogEntriesService();
      setEntries(res.success ? res.data!.blogEntries : []);
    })();
  }, []);

  return (
    <div className="mt-8 relative">
      <BlogSearchBar setEntries={(data: BlogEntryData[]) => setEntries(data)} />
      <BlogList entries={entries} />
      <button
        className="fixed bottom-8 right-8 text-white bg-blue-600 py-2 px-4 rounded-3xl md:text-xl text-lg"
        onClick={publishHandler}
      >
        + Publicar
      </button>
    </div>
  );
};
