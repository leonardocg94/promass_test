import { DataTypes, Model } from "sequelize";
import { db } from "../config/db";
import { UserModel } from "./interfaces";
import { DaoBlog } from "../blog/model";

//definición de la tabla de usuario
const DaoUser = db.define<Model<UserModel, any>, UserModel>(
  "blog_user",
  {
    id: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  { tableName: "user_client", timestamps: false }
);

//relación de pertenencia author - entrada de blog, uno a muchos
DaoUser.hasMany(DaoBlog, { as: "blog_entries", foreignKey: "author_id" });
DaoBlog.belongsTo(DaoUser, { as: "author", foreignKey: "author_id" });

export { DaoUser };
