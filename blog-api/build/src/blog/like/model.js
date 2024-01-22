"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DaoBlogLike = void 0;
const sequelize_1 = require("sequelize");
const db_1 = require("../../config/db");
const model_1 = require("../model");
const user_1 = require("../../user");
//modelo de la tabla like del blog
const DaoBlogLike = db_1.db.define("blog_like", {
    id: {
        type: sequelize_1.DataTypes.UUID,
        allowNull: false,
        primaryKey: true,
        defaultValue: sequelize_1.DataTypes.UUIDV4,
    },
}, { timestamps: false, tableName: "blog_like" });
exports.DaoBlogLike = DaoBlogLike;
//relacion de likes con usuarios y publicaciones
model_1.DaoBlog.belongsToMany(user_1.DaoUser, {
    through: DaoBlogLike,
    foreignKey: "blog_entry_id",
    as: "user_likes"
});
user_1.DaoUser.belongsToMany(model_1.DaoBlog, { through: DaoBlogLike, foreignKey: "user_id" });
