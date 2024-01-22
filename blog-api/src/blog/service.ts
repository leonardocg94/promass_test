import { Op, Sequelize } from "sequelize";
import { DaoBlog } from "./model";
import {
  CreateBlogEntryBody,
  SearchBlogEntryParams,
  searchBlogEntryParamsValidator,
} from "./validators";
import { DaoBlogLike } from "./like";
import { DaoUser } from "../user";

//servicio para crear una entrada del blog
export const createBlogEntryService = async (
  author_id: string,
  blogEntry: CreateBlogEntryBody
) => {
  const createdBlogEntry = await DaoBlog.create({ author_id, ...blogEntry });
  if (!createdBlogEntry)
    throw new Error("Ocurrió un error al crear tu publicación");

  return createdBlogEntry;
};

//servicio para traer los detalles de una publicación
export const getBlogEntryService = async (
  blog_entry_id: string,
  user_id?: string
) => {
  const foundBlogEntry = await DaoBlog.findByPk(blog_entry_id, {
    include: [{ model: DaoUser, as: "author", attributes: ["name"] }],
  });
  if (!foundBlogEntry) throw new Error("Publicación no encontrada");

  if (!user_id) return { blogEntry: foundBlogEntry, liked: false };

  const liked = await DaoBlogLike.findOne({
    where: { blog_entry_id, user_id },
  });

  return { blogEntry: foundBlogEntry, liked: !liked ? false : true };
};

//servicio para traer todos lo blogs o filtrar por búsqueda
export const listBlogEntriesService = async (params: SearchBlogEntryParams) => {
  let validatedParams: SearchBlogEntryParams | undefined;
  if (params.searchValue || params.searchCriteria)
    validatedParams = await searchBlogEntryParamsValidator.validate(params);

  if (!validatedParams) {
    const blogEntries = await DaoBlog.findAll({
      attributes: [
        "id",
        "title",
        "createdAt",
        "content",
        [
          Sequelize.literal(
            "(SELECT COUNT(*) FROM blog_like WHERE blog_like.blog_entry_id=blog_entry.id)"
          ),
          "likes_count",
        ],
      ],
      include: [{ model: DaoUser, as: "author", attributes: ["name"] }],
    });
    if (!blogEntries)
      throw new Error("Ocurrió un error al obtener las publicaciónes");
    return blogEntries;
  }

  const { searchCriteria, searchValue } = validatedParams;

  const blogEntries = await DaoBlog.findAll({
    where:
      searchCriteria !== "author"
        ? { [searchCriteria]: { [Op.like]: `%${searchValue}%` } }
        : undefined,
    attributes: [
      "id",
      "title",
      "createdAt",
      "content",
      [
        Sequelize.literal(
          "(SELECT COUNT(*) FROM blog_like WHERE blog_like.blog_entry_id=blog_entry.id)"
        ),
        "likes_count",
      ],
    ],
    include: [
      {
        model: DaoUser,
        as: "author",
        attributes: ["name"],
        where:
          searchCriteria === "author"
            ? { name: { [Op.like]: `%${searchValue}%` } }
            : undefined,
      },
    ],
  });
  if (!blogEntries)
    throw new Error("Ocurrió un error al obtener las publicaciónes");

  return blogEntries;
};
