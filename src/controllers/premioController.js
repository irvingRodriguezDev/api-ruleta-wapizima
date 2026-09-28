const { Op } = require("sequelize");
const { Premio } = require("../models");

// Obtener todos los premios
exports.obtenerPremios = async (req, res) => {
  try {
    const premios = await Premio.findAll({
      order: [["id", "DESC"]],
    });
    res.json(premios);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Error al obtener los premios: " + error.message });
  }
};

// Obtener solo premios disponibles para el sorteo (cantidad > 0)
exports.obtenerPremiosDisponibles = async (req, res) => {
  try {
    const premiosDisponibles = await Premio.findAll({
      where: {
        cantidad: {
          [Op.gt]: 0, // Op.gt equivale a mayor que cero (cantidad > 0)
        },
      },
      order: [["id", "ASC"]],
    });
    res.json(premiosDisponibles);
  } catch (error) {
    res.status(500).json({
      error: "Error al obtener premios disponibles: " + error.message,
    });
  }
};

// Crear un nuevo premio
exports.crearPremio = async (req, res) => {
  try {
    const { nombre, cantidad, color } = req.body;

    if (!nombre) {
      return res
        .status(400)
        .json({ error: "El nombre del premio es obligatorio." });
    }

    const nuevoPremio = await Premio.create({
      nombre,
      cantidad: cantidad !== undefined ? Number(cantidad) : 1,
      color: color || "#3498db",
    });

    res.status(201).json(nuevoPremio);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Error al crear el premio: " + error.message });
  }
};

// Actualizar un premio existente (por ejemplo, para modificar stock o color)
exports.actualizarPremio = async (req, res) => {
  try {
    const { id } = req.params;
    const { nombre, cantidad, color } = req.body;

    const premio = await Premio.findByPk(id);

    if (!premio) {
      return res.status(404).json({ error: "Premio no encontrado." });
    }

    // Actualizar campos si vienen en la petición
    if (nombre !== undefined) premio.nombre = nombre;
    if (cantidad !== undefined) premio.cantidad = cantidad;
    if (color !== undefined) premio.color = color;

    await premio.save();

    res.json({ message: "Premio actualizado exitosamente.", premio });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Error al actualizar el premio: " + error.message });
  }
};

// Eliminar un premio por ID
exports.eliminarPremio = async (req, res) => {
  try {
    const { id } = req.params;
    const borrado = await Premio.destroy({ where: { id } });

    if (!borrado) {
      return res.status(404).json({ error: "Premio no encontrado." });
    }

    res.json({ message: "Premio eliminado exitosamente." });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Error al eliminar el premio: " + error.message });
  }
};
