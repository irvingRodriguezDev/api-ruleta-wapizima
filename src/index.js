require("dotenv").config();
const app = require("./app");
const { sequelize } = require("./models");

const PORT = process.env.PORT || 3001;

/**
 * Función principal para autenticar la conexión a MySQL,
 * sincronizar las tablas y arrancar el servidor HTTP.
 */
async function main() {
  try {
    // 1. Probar la conexión a la base de datos
    await sequelize.authenticate();
    console.log(" Conexión a MySQL establecida exitosamente con Sequelize.");

    // 2. Sincronizar las tablas (alter: true ajusta campos sin borrar registros)
    await sequelize.sync({ alter: true });
    console.log(" Tablas e índices sincronizados con la base de datos.");

    // 3. Levantar el servidor
    app.listen(PORT, () => {
      console.log(
        `🚀 [Backend] Servidor escuchando en http://localhost:${PORT}`,
      );
    });
  } catch (error) {
    console.error(
      " Error al inicializar el servidor o la base de datos:",
      error,
    );
    process.exit(1);
  }
}

main();
