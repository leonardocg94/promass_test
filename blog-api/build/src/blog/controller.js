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
exports.listBlogEntriesController = exports.getBlogEntryController = exports.createBlogEntryController = void 0;
const validators_1 = require("./validators");
const service_1 = require("./service");
//controlador para crear una publicación en el blog
const createBlogEntryController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        if (!((_a = req.authData) === null || _a === void 0 ? void 0 : _a.id))
            throw new Error("No hay token de sesión");
        const body = yield validators_1.createBlogEntryValidator.validate(req.body);
        const createdBlogEntry = yield (0, service_1.createBlogEntryService)(req.authData.id, body);
        return res.status(201).json({
            success: true,
            data: { title: createdBlogEntry.getDataValue("title") },
        });
    }
    catch (error) {
        req.err = error;
        next();
    }
});
exports.createBlogEntryController = createBlogEntryController;
//controlador para traer los detalles de una publicación
const getBlogEntryController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _b;
    try {
        if (!req.params.blog_entry_id)
            throw new Error("Falta identificador de la publicación");
        const blogEntry = yield (0, service_1.getBlogEntryService)(req.params.blog_entry_id, (_b = req.authData) === null || _b === void 0 ? void 0 : _b.id);
        return res.json({ success: true, data: blogEntry });
    }
    catch (error) {
        req.err = error;
        next();
    }
});
exports.getBlogEntryController = getBlogEntryController;
//controlador para listar o buscar publicaciones
const listBlogEntriesController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const blogEntries = yield (0, service_1.listBlogEntriesService)(req.query);
        return res.json({ success: true, data: { blogEntries } });
    }
    catch (error) {
        req.err = error;
        next();
    }
});
exports.listBlogEntriesController = listBlogEntriesController;
