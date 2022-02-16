'use strict';

const { DataTypes } =  require("sequelize");

const tableName = "desenvolvedor"

module.exports = {
  async up (queryInterface, Sequelize) {
    queryInterface.createTable(tableName, {
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
      },
      nivel_id: {
        type: DataTypes.INTEGER.UNSIGNED
    }
    })
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable(tableName)
  }
};
