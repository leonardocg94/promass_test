import { Router } from "express";
import { checkTokenMiddleware, getTokenIfExistMiddleware } from "../common";
import {
  createBlogEntryController,
  getBlogEntryController,
  listBlogEntriesController,
} from "./controller";

const blogRouter = Router();

blogRouter.get(
  "/:blog_entry_id",
  getTokenIfExistMiddleware,
  getBlogEntryController
);
blogRouter.get("", listBlogEntriesController);

blogRouter.post("", checkTokenMiddleware, createBlogEntryController);

export { blogRouter };
