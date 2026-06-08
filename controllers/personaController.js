const Persona = require("../models/personaModel");

exports.buscarPersona = async (req, res) => {
  try {
    const { cedula } = req.body;
    if (!cedula) {
      res.send("<p>El campo de Cédula es obligatorio.</p>");
    }
    const usuario = await Persona.obtenerPorCedula(cedula);
    if (usuario) {
      res.render("resultado", { usuario });
    } else {
      res.render("resultado", {
        usuario: "<p>No existe nadie con esa cédula.</p>",
      });
    }
  } catch (error) {
    res.status(500).send("error interno del servidor");
  }
};
