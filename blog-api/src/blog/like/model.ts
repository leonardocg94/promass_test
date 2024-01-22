import { DataTypes, Model } from "sequelize";
import { db } from "../../config/db";
import { LikeModel } from "./interfaces";
import { DaoBlog } from "../model";
import { DaoUser } from "../../user";

//modelo de la tabla like del blog
const DaoBlogLike = db.define<Model<LikeModel, any>, LikeModel>(
  "blog_like",
  {
    id: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
  },
  { timestamps: false, tableName: "blog_like" }
);

//relacion de likes con usuarios y publicaciones
DaoBlog.belongsToMany(DaoUser, {
  through: DaoBlogLike,
  foreignKey: "blog_entry_id",
  as: "user_likes"
});
DaoUser.belongsToMany(DaoBlog, { through: DaoBlogLike, foreignKey: "user_id" });

export { DaoBlogLike };
