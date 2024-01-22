import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import { exit } from "process";
import { userRouter } from "./src/user";
import { AuthData, errorHandlerMiddleware } from "./src/common";
import { db } from "./src/config/db";
import { blogRouter } from "./src/blog";
import { blogLikeRouter } from "./src/blog/like";

//declaración del puerto
const PORT = process.env.PORT as string;

//creación de la aplicación
const app = express();

//declaración de módulos
declare module "express" {
  export interface Request {
    err?: any;
    authData?: AuthData;
    // permission?: AdminCollaboratorPermission;
  }
}

//uso de middlewares globales
app.use(cors());
app.use(express.json());

//endpoints
app.use("/user", userRouter);
app.use("/blog", blogRouter);
app.use("/blog_like", blogLikeRouter);
app.use(errorHandlerMiddleware);

//inicialización del server
const startServer = async () => {
  try {
    await db.sync({ alter: true });
    app.listen(PORT, () => {
      console.log(`[SERVER]: server is running on port: ${PORT}`);
    });
  } catch (error) {
    console.log(error);
    exit(1);
  }
};

startServer();
