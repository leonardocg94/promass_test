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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const process_1 = require("process");
const user_1 = require("./src/user");
const common_1 = require("./src/common");
const db_1 = require("./src/config/db");
const blog_1 = require("./src/blog");
const like_1 = require("./src/blog/like");
//declaración del puerto
const PORT = process.env.PORT;
//creación de la aplicación
const app = (0, express_1.default)();
//uso de middlewares globales
app.use((0, cors_1.default)());
app.use(express_1.default.json());
//endpoints
app.use("/user", user_1.userRouter);
app.use("/blog", blog_1.blogRouter);
app.use("/blog_like", like_1.blogLikeRouter);
app.use(common_1.errorHandlerMiddleware);
//inicialización del server
const startServer = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield db_1.db.sync({ alter: true });
        app.listen(PORT, () => {
            console.log(`[SERVER]: server is running on port: ${PORT}`);
        });
    }
    catch (error) {
        console.log(error);
        (0, process_1.exit)(1);
    }
});
startServer();
