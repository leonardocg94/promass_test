"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.listBlogEntriesService = exports.getBlogEntryService = exports.createBlogEntryService = void 0;
const sequelize_1 = require("sequelize");
const model_1 = require("./model");
const validators_1 = require("./validators");
const like_1 = require("./like");
const user_1 = require("../user");
//servicio para crear una entrada del blog
const createBlogEntryService = (author_id, blogEntry) => __awaiter(void 0, void 0, void 0, function* () {
    const createdBlogEntry = yield model_1.DaoBlog.create(Object.assign({ author_id }, blogEntry));
    if (!createdBlogEntry)
        throw new Error("Ocurrió un error al crear tu publicación");
    return createdBlogEntry;
});
exports.createBlogEntryService = createBlogEntryService;
//servicio para traer los detalles de una publicación
const getBlogEntryService = (blog_entry_id, user_id) => __awaiter(void 0, void 0, void 0, function* () {
    const foundBlogEntry = yield model_1.DaoBlog.findByPk(blog_entry_id, {
        include: [{ model: user_1.DaoUser, as: "author", attributes: ["name"] }],
    });
    if (!foundBlogEntry)
        throw new Error("Publicación no encontrada");
    if (!user_id)
        return { blogEntry: foundBlogEntry, liked: false };
    const liked = yield like_1.DaoBlogLike.findOne({
        where: { blog_entry_id, user_id },
    });
    return { blogEntry: foundBlogEntry, liked: !liked ? false : true };
});
exports.getBlogEntryService = getBlogEntryService;
//servicio para traer todos lo blogs o filtrar por búsqueda
const listBlogEntriesService = (params) => __awaiter(void 0, void 0, void 0, function* () {
    let validatedParams;
    if (params.searchValue || params.searchCriteria)
        validatedParams = yield validators_1.searchBlogEntryParamsValidator.validate(params);
    if (!validatedParams) {
        const blogEntries = yield model_1.DaoBlog.findAll({
            attributes: [
                "id",
                "title",
                "createdAt",
                "content",
                [
                    sequelize_1.Sequelize.literal("(SELECT COUNT(*) FROM blog_like WHERE blog_like.blog_entry_id=blog_entry.id)"),
                    "likes_count",
                ],
            ],
            include: [{ model: user_1.DaoUser, as: "author", attributes: ["name"] }],
        });
        if (!blogEntries)
            throw new Error("Ocurrió un error al obtener las publicaciónes");
        return blogEntries;
    }
    const { searchCriteria, searchValue } = validatedParams;
    const blogEntries = yield model_1.DaoBlog.findAll({
        where: searchCriteria !== "author"
            ? { [searchCriteria]: { [sequelize_1.Op.like]: `%${searchValue}%` } }
            : undefined,
        attributes: [
            "id",
            "title",
            "createdAt",
            "content",
            [
                sequelize_1.Sequelize.literal("(SELECT COUNT(*) FROM blog_like WHERE blog_like.blog_entry_id=blog_entry.id)"),
                "likes_count",
            ],
        ],
        include: [
            {
                model: user_1.DaoUser,
                as: "author",
                attributes: ["name"],
                where: searchCriteria === "author"
                    ? { name: { [sequelize_1.Op.like]: `%${searchValue}%` } }
                    : undefined,
            },
        ],
    });
    if (!blogEntries)
        throw new Error("Ocurrió un error al obtener las publicaciónes");
    return blogEntries;
});
exports.listBlogEntriesService = listBlogEntriesService;
