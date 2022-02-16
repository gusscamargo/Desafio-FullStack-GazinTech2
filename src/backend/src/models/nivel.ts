import { Model, DataTypes } from "sequelize"
import connection from "../config/database"
import type { NivelAttributes } from "../../types"


class Nivel extends Model<NivelAttributes> {
    declare id: number
    declare nivel: string
}

Nivel.init({
        id: {
            type: DataTypes.INTEGER.UNSIGNED,
            autoIncrement: true,
            primaryKey: true
        },
        nivel: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notNull: true,
                notEmpty: true
            }
        },
        
    },
    {
        modelName: "Nivel",
        tableName: "nivel",
        sequelize: connection,
        timestamps: false
    }
)

export default Nivel