const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Participante = sequelize.define(
  "Participante",
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
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: { isEmail: true },
    },
  },
  {
    tableName: "participantes",
    timestamps: true,
  },
);

module.exports = Participante;
