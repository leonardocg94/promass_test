import { Model } from "sequelize";
import { UserModel } from "../user";

export type BlogModel = {
  id: string;
  title: string;
  content: string;
  created_at?: Date;
  updated_at?: Date;
  author?: Model<UserModel, any>;
  author_id?: string;
};
