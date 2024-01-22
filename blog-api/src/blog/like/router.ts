import { Router } from "express";
import { checkTokenMiddleware } from "../../common";
import { toggleBlogLikeController } from "./controller";

const blogLikeRouter = Router();

blogLikeRouter.use(checkTokenMiddleware);
blogLikeRouter.post("", toggleBlogLikeController);

export { blogLikeRouter };
