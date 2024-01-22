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
exports.toggleBlogLikeController = void 0;
const service_1 = require("./service");
//controlador para manejar los likes de una entrada del blog
const toggleBlogLikeController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        if (!((_a = req.authData) === null || _a === void 0 ? void 0 : _a.id) || !req.body.blog_entry_id)
            throw new Error("Faltan identificadores");
        yield (0, service_1.toggleBlogLikeService)(req.authData.id, req.body.blog_entry_id);
        return res.json({ success: true });
    }
    catch (error) {
        req.err = error;
        next();
    }
});
exports.toggleBlogLikeController = toggleBlogLikeController;
