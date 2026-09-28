const express = require("express");
const router = express.Router();
const participanteController = require("../controllers/participanteController");

// GET /api/participantes - Listar todos los participantes
router.get("/", participanteController.obtenerParticipantes);

// POST /api/participantes - Crear un nuevo participante
router.post("/", participanteController.crearParticipante);

// DELETE /api/participantes/:id - Eliminar un participante por su ID
router.delete("/:id", participanteController.eliminarParticipante);

module.exports = router;
