const express = require("express");
const cors = require("cors");
const db = require("./src/config/db");

const app = express();
const PORT = 3001;

// Middlewares
app.use(cors());
app.use(express.json());

// ----------------------------------------------------
// PARTICIPANTES
// ----------------------------------------------------

// Obtener todos los participantes
app.get("/api/participantes", async (req, res) => {
  try {
    const [rows] = await db.query(
      "SELECT * FROM participantes ORDER BY id DESC",
    );
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Registrar nuevo participante
app.post("/api/participantes", async (req, res) => {
  const { nombre, email } = req.body;
  if (!nombre || !email) {
    return res.status(400).json({ error: "Nombre y email son requeridos" });
  }

  try {
    const [result] = await db.query(
      "INSERT INTO participantes (nombre, email) VALUES (?, ?)",
      [nombre, email],
    );
    res.status(201).json({ id: result.insertId, nombre, email });
  } catch (error) {
    if (error.code === "ER_DUP_ENTRY") {
      return res.status(400).json({ error: "El email ya está registrado" });
    }
    res.status(500).json({ error: error.message });
  }
});

// Eliminar participante
app.delete("/api/participantes/:id", async (req, res) => {
  const { id } = req.params;
  try {
    await db.query("DELETE FROM participantes WHERE id = ?", [id]);
    res.json({ message: "Participante eliminado" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ----------------------------------------------------
// PREMIOS
// ----------------------------------------------------

// Obtener premios (opcionalmente solo los disponibles)
app.get("/api/premios", async (req, res) => {
  try {
    const [rows] = await db.query("SELECT * FROM premios ORDER BY id DESC");
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Crear nuevo premio
app.post("/api/premios", async (req, res) => {
  const { nombre, cantidad, color } = req.body;
  if (!nombre) {
    return res.status(400).json({ error: "El nombre del premio es requerido" });
  }

  try {
    const stock = cantidad || 1;
    const hexColor = color || "#36A2EB";
    const [result] = await db.query(
      "INSERT INTO premios (nombre, cantidad, color) VALUES (?, ?, ?)",
      [nombre, stock, hexColor],
    );
    res
      .status(201)
      .json({ id: result.insertId, nombre, cantidad: stock, color: hexColor });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Eliminar premio
app.delete("/api/premios/:id", async (req, res) => {
  const { id } = req.params;
  try {
    await db.query("DELETE FROM premios WHERE id = ?", [id]);
    res.json({ message: "Premio eliminado" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ----------------------------------------------------
// GANADORES Y SORTEO
// ----------------------------------------------------

// Registrar un ganador y descontar 1 del stock del premio
app.post("/api/ganadores", async (req, res) => {
  const { participanteId, premioId } = req.body;

  if (!participanteId || !premioId) {
    return res
      .status(400)
      .json({ error: "participanteId y premioId son requeridos" });
  }

  try {
    // Registrar ganador
    const [result] = await db.query(
      "INSERT INTO ganadores (participante_id, premio_id) VALUES (?, ?)",
      [participanteId, premioId],
    );

    // Descontar stock del premio
    await db.query(
      "UPDATE premios SET cantidad = cantidad - 1 WHERE id = ? AND cantidad > 0",
      [premioId],
    );

    res.status(201).json({
      id: result.insertId,
      participanteId,
      premioId,
      fecha: new Date(),
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Historial de ganadores con detalles
app.get("/api/ganadores", async (req, res) => {
  try {
    const query = `
      SELECT 
        g.id,
        p.nombre AS participante_nombre,
        p.email AS participante_email,
        pr.nombre AS premio_nombre,
        g.fecha
      FROM ganadores g
      JOIN participantes p ON g.participante_id = p.id
      JOIN premios pr ON g.premio_id = pr.id
      ORDER BY g.fecha DESC
    `;
    const [rows] = await db.query(query);
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`Servidor de la ruleta ejecutándose en http://localhost:${PORT}`);
});
