import { Model, DataTypes, InferAttributes, InferCreationAttributes, CreationOptional } from "sequelize"
import connection from "../config/database"
import type { desenvolvedorAttributes } from "../types"

class Desenvolvedor extends Model<InferAttributes<Desenvolvedor>, InferCreationAttributes<Desenvolvedor>> implements desenvolvedorAttributes{
    declare id: number
    declare nome: string
    declare sexo: CreationOptional<string>
    declare datanascimento: Date
    declare idade: number
    declare hobby: CreationOptional<string>
}

Desenvolvedor.init({
    id: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true
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
        }
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
    }
},{
    modelName: "Desenvolvedor",
    tableName: "desenvolvedor",
    sequelize: connection
})

export default Desenvolvedor