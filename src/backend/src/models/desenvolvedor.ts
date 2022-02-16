import { Model, DataTypes, InferAttributes, InferCreationAttributes, CreationOptional } from "sequelize"
import connection from "../config/database"
import type { DesenvolvedorAttributes } from "../types"
import Nivel from "./nivel"

class Desenvolvedor extends Model<InferAttributes<Desenvolvedor>, InferCreationAttributes<Desenvolvedor>> implements DesenvolvedorAttributes{
    declare id: number
    declare nome: string
    declare sexo: CreationOptional<string>
    declare datanascimento: Date
    declare idade: number
    declare hobby: CreationOptional<string>
    declare nivel_id: number
}

Desenvolvedor.init({
    id: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
        unique: true
    },
    nome: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notNull: true,
            notEmpty: true
        }
    },
    sexo: {
        type: DataTypes.CHAR,
        allowNull: true
    },
    datanascimento: {
        type: DataTypes.DATEONLY,
        allowNull: false,
        validate: {
            notNull: true,
            notEmpty: true,
            isDate: true
        },
    },
    idade: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            notNull: true,
            notEmpty: true,
            isNumeric: true,
            isInt: true
        }
    },
    hobby: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    nivel_id: {
        type: DataTypes.INTEGER.UNSIGNED
    }
},{
    modelName: "Desenvolvedor",
    tableName: "desenvolvedor",
    sequelize: connection,
    timestamps: false
})

Desenvolvedor.belongsTo(Nivel, { foreignKey: "nivel_id" })

export default Desenvolvedor