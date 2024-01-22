import { DaoBlogLike } from "./model";

//servicio que controla los likes
export const toggleBlogLikeService = async (
  user_id: string,
  blog_entry_id: string
) => {
  const blogLike = await DaoBlogLike.findOne({
    where: { user_id, blog_entry_id },
  });
  if (!blogLike) await DaoBlogLike.create({ user_id, blog_entry_id });
  else await DaoBlogLike.destroy({ where: { user_id, blog_entry_id } });
};
