import { Sequelize } from "sequelize"

module.exports = new Sequelize(
    process.env.DB_NAME || "desafio",
    process.env.DB_USER || "root",
    process.env.DB_PASSWORD || "root",
    {
        host: process.env.DB_HOST || "mysql",
        port: parseInt(process.env.DB_PORT || "") || 3306,
        dialect: "mysql"
    }
)