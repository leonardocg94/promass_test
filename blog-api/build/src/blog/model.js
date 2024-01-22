"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DaoBlog = void 0;
const sequelize_1 = require("sequelize");
const db_1 = require("../config/db");
//modelo de la tabla de entrada del blog
const DaoBlog = db_1.db.define("blog_entry", {
    id: {
        type: sequelize_1.DataTypes.UUID,
        allowNull: false,
        primaryKey: true,
        defaultValue: sequelize_1.DataTypes.UUIDV4,
    },
    title: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    content: {
        type: sequelize_1.DataTypes.TEXT,
        allowNull: false,
    },
}, { tableName: "blog_entry" });
exports.DaoBlog = DaoBlog;
