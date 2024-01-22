import { DataTypes, Model } from "sequelize";
import { db } from "../config/db";
import { BlogModel } from "./interfaces";

//modelo de la tabla de entrada del blog
const DaoBlog = db.define<Model<BlogModel, any>, BlogModel>(
  "blog_entry",
  {
    id: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  },
  { tableName: "blog_entry" }
);

export { DaoBlog };
