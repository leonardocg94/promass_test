import { FC } from "react";
import { BlogEntryData } from "../interfaces";
import { Link } from "react-router-dom";
import dayjs from "dayjs";

type Props = {
  item: BlogEntryData;
};

export const BlogListItem: FC<Props> = ({ item }) => {
  return (
    <article className="flex w-[1200px] mx-auto shadow-sm bg-white flex-col-reverse md:flex-row max-w-full" >
      <div className="flex-1 flex flex-col justify-center gap-2 p-6" >
        <h3 className="font-semibold text-2xl" >{item.title}</h3>
        <span>{item.likes_count} likes</span>
        <p className="max-w-full">
          {item.content.length > 70
            ? item.content.slice(0, 70) + "..."
            : item.content}
        </p>
        <Link to={`/blogEntry/${item.id}`} className="text-blue-600 font-light" >{"Leer mas ->"}</Link>
        <div className="flex justify-between" >
          <span>{item.author.name}</span>
          <span>{dayjs(item.createdAt).format("DD/MM/YYYY")}</span>
        </div>
      </div>
      <img
        src="https://images.unsplash.com/photo-1501504905252-473c47e087f8?q=80&w=2574&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        alt="dummy img"
        className="w-[300px] max-w-full mx-auto md:mt-0 mt-4"
      />
    </article>
  );
};
