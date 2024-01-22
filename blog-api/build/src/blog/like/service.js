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
exports.toggleBlogLikeService = void 0;
const model_1 = require("./model");
//servicio que controla los likes
const toggleBlogLikeService = (user_id, blog_entry_id) => __awaiter(void 0, void 0, void 0, function* () {
    const blogLike = yield model_1.DaoBlogLike.findOne({
        where: { user_id, blog_entry_id },
    });
    if (!blogLike)
        yield model_1.DaoBlogLike.create({ user_id, blog_entry_id });
    else
        yield model_1.DaoBlogLike.destroy({ where: { user_id, blog_entry_id } });
});
exports.toggleBlogLikeService = toggleBlogLikeService;
