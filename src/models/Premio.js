const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Premio = sequelize.define(
  "Premio",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    nombre: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    cantidad: {
      type: DataTypes.INTEGER,
      defaultValue: 1,
    },
    color: {
      type: DataTypes.STRING,
      defaultValue: "#3498db",
    },
  },
  {
    tableName: "premios",
    timestamps: true,
  },
);

module.exports = Premio;
