const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Ganador = sequelize.define(
  "Ganador",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
  },
  {
    tableName: "ganadores",
    timestamps: true,
  },
);

module.exports = Ganador;
