const express = require("express");
const router = express.Router();
const premioController = require("../controllers/premioController");

// GET /api/premios - Listar todos los premios
router.get("/", premioController.obtenerPremios);

// GET /api/premios/disponibles - Obtener solo premios con cantidad > 0
router.get("/disponibles", premioController.obtenerPremiosDisponibles);

// POST /api/premios - Crear un nuevo premio
router.post("/", premioController.crearPremio);

// PUT /api/premios/:id - Actualizar datos o stock de un premio
router.put("/:id", premioController.actualizarPremio);

// DELETE /api/premios/:id - Eliminar un premio por su ID
router.delete("/:id", premioController.eliminarPremio);

module.exports = router;
