import { FC } from "react";
import { BlogEntryData } from "../interfaces";
import { BlogListItem } from "./BlogListItem";

type Props = {
  entries: BlogEntryData[];
};

export const BlogList: FC<Props> = ({ entries }) => {
  return (
    <div className="mt-6 flex flex-col gap-8 pb-6">
      {entries.length === 0 ? (
        <p className="text-center">No hay publicaciones disponibles</p>
      ) : (
        entries.map((entry) => <BlogListItem item={entry} key={entry.id} />)
      )}
    </div>
  );
};
