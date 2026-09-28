const express = require("express");
const router = express.Router();
const ganadorController = require("../controllers/ganadorController");

// GET /api/ganadores - Obtener el historial completo de ganadores con detalles
router.get("/", ganadorController.obtenerHistorial);

// POST /api/ganadores - Registrar un nuevo ganador y descontar stock en transacción
router.post("/", ganadorController.registrarGanador);

module.exports = router;
