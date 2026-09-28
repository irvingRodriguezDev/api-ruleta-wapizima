const { Participante } = require("../models");

exports.obtenerParticipantes = async (req, res) => {
  try {
    const participantes = await Participante.findAll({
      order: [["id", "DESC"]],
    });
    res.json(participantes);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.crearParticipante = async (req, res) => {
  try {
    const { nombre, email } = req.body;
    const nuevo = await Participante.create({ nombre, email });
    res.status(201).json(nuevo);
  } catch (error) {
    if (error.name === "SequelizeUniqueConstraintError") {
      return res
        .status(400)
        .json({ error: "El correo electrónico ya existe." });
    }
    res.status(500).json({ error: error.message });
  }
};

exports.eliminarParticipante = async (req, res) => {
  try {
    const { id } = req.params;
    const borrado = await Participante.destroy({ where: { id } });
    if (!borrado)
      return res.status(404).json({ error: "Participante no encontrado" });
    res.json({ message: "Participante eliminado exitosamente." });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
