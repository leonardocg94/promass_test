"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DaoUser = void 0;
const sequelize_1 = require("sequelize");
const db_1 = require("../config/db");
const model_1 = require("../blog/model");
//definición de la tabla de usuario
const DaoUser = db_1.db.define("blog_user", {
    id: {
        type: sequelize_1.DataTypes.UUID,
        allowNull: false,
        primaryKey: true,
        defaultValue: sequelize_1.DataTypes.UUIDV4,
    },
    name: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    password: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
}, { tableName: "user_client", timestamps: false });
exports.DaoUser = DaoUser;
//relación de pertenencia author - entrada de blog, uno a muchos
DaoUser.hasMany(model_1.DaoBlog, { as: "blog_entries", foreignKey: "author_id" });
model_1.DaoBlog.belongsTo(DaoUser, { as: "author", foreignKey: "author_id" });
