const express = require("express");
const cors = require("cors");

const participanteRoutes = require("./routes/participanteRoutes");
const premioRoutes = require("./routes/premioRoutes");
const ganadorRoutes = require("./routes/ganadorRoutes");

const app = express();

app.use(cors());
app.use(express.json());

// Montaje de enrutadores
app.use("/api/participantes", participanteRoutes);
app.use("/api/premios", premioRoutes);
app.use("/api/ganadores", ganadorRoutes);

module.exports = app;
