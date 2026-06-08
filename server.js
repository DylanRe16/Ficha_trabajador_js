const express = require("express");
//const db = require("./db");
const app = express();
const personaController = require("./controllers/personaController");
app.set("view engine", "ejs");
app.use(express.json()); // Para recibir datos en formato JSON
app.use(express.urlencoded({ extended: true })); // Para recibir datos de formularios (form-data)
app.get("/", async (req, res) => {
  // Aquí "inyectamos" los datos en una cadena HTML
  res.render("index");
});

app.post("/buscar", personaController.buscarPersona);

// app.post("/buscar", async (req, res) => {
//   const { cedula } = req.body; // Capturamos lo que el usuario escribió
//   try {
//     const result = await db.query(
//       'SELECT * FROM "personales" WHERE cedula = $1',
//       [cedula],
//     );
//     if (result.rows.length > 0) {
//       res.render("index", {
//         titulo: "Información del Personal",
//         usuario: result.rows[0],
//       });
//     } else {
//       res.render("index", {
//         titulo: "No encontrado",
//         contenido: "<p>No existe nadie con esa cédula.</p>",
//       });
//     }
//   } catch (err) {
//     res.send("Error al consultar la base de datos.");
//   }
// });
app.listen(3000, () => {
  console.log("Servidor iniciado en http://localhost:3000");
});
