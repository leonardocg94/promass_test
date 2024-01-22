import { Model } from "sequelize";
import { BlogModel } from "../blog";

export type UserModel = {
  id: string;
  name: string;
  email: string;
  password: string;
  blog_entries?: Model<BlogModel, any>[];
};
