const express = require("express");
const path = require("path");
const app = express();
const personaController = require("./controllers/personaController");
const session = require("express-session");
const verificarAuth = require("./middleware/auth");
const authController = require("./controllers/authController");

app.use(express.static(path.join(__dirname, "public")));

app.set("view engine", "ejs");
app.use(express.json()); // Para recibir datos en formato JSON
app.use(express.urlencoded({ extended: true })); // Para recibir datos de formularios (form-data)
app.use(
  session({
    secret: "123456789",
    resave: false,
    saveUninitialized: false,
  }),
);
app.use((req, res, next) => {
  // console.log("Procesando ruta:", req.path);
  res.locals.usuarioLogueado = req.session.usuarioId;
  next();
});
// Ruta pública
app.get("/login", (req, res) => res.render("login"));
app.post("/login", authController.login);

// Logout
app.get("/logout", (req, res) => {
  req.session.destroy(() => res.redirect("login"));
});

app.get("/", async (req, res) => {
  // Verificamos si hay sesión (para proteger la página de inicio)
  if (!req.session.usuarioId) {
    return res.redirect("/login");
  } else {
    // Aquí "inyectamos" los datos en una cadena HTML
    return res.render("index");
  }
});

// Ruta protegida (requiere estar logueado)
app.post("/buscar", verificarAuth, personaController.buscarPersona);

app.listen(3000, () => {
  console.log("Servidor iniciado en http://localhost:3000");
});
