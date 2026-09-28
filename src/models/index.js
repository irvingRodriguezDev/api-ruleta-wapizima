const sequelize = require("../config/database");
const Participante = require("./Participante");
const Premio = require("./Premio");
const Ganador = require("./Ganador");

// Definición de Relaciones (Claves Foráneas)
Ganador.belongsTo(Participante, {
  foreignKey: "participanteId",
  as: "participante",
});
Ganador.belongsTo(Premio, { foreignKey: "premioId", as: "premio" });

Participante.hasMany(Ganador, { foreignKey: "participanteId" });
Premio.hasMany(Ganador, { foreignKey: "premioId" });

module.exports = {
  sequelize,
  Participante,
  Premio,
  Ganador,
};
