const { Ganador, Participante, Premio, sequelize } = require("../models");

exports.registrarGanador = async (req, res) => {
  const t = await sequelize.transaction(); // Transacción para garantizar consistencia
  try {
    const { participanteId, premioId } = req.body;

    const premio = await Premio.findByPk(premioId, { transaction: t });
    if (!premio || premio.cantidad <= 0) {
      await t.rollback();
      return res
        .status(400)
        .json({ error: "El premio seleccionado no tiene stock disponible." });
    }

    // Crear registro de ganador
    const ganador = await Ganador.create(
      { participanteId, premioId },
      { transaction: t },
    );

    // Descontar stock
    await premio.decrement("cantidad", { by: 1, transaction: t });

    await t.commit();
    res.status(201).json(ganador);
  } catch (error) {
    await t.rollback();
    res.status(500).json({ error: error.message });
  }
};

exports.obtenerHistorial = async (req, res) => {
  try {
    const historial = await Ganador.findAll({
      include: [
        {
          model: Participante,
          as: "participante",
          attributes: ["nombre", "email"],
        },
        { model: Premio, as: "premio", attributes: ["nombre"] },
      ],
      order: [["createdAt", "DESC"]],
    });
    res.json(historial);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
