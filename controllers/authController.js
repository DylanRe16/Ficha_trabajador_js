const bcrypt = require("bcryptjs");
const AuthModel = require("../models/authModel");

exports.login = async (req, res) => {
  const { cedula, password } = req.body;
  if (!cedula || !password) {
    return res.render("login", {
      error: "Los campos son obligatorios.",
    });
  }
  try {
    const usuario = await AuthModel.buscarUsuario(cedula);

    if (usuario) {
      //console.log("Hash desde BD:", usuario.sclave);

      const esValida = await bcrypt.compare(password, usuario.sclave);
      //console.log("¿Es el hash compatible?:", esValida);
      if (esValida) {
        req.session.usuarioId = usuario.cedula;
        return res.redirect("/");
      }
    } else {
      return res.render("login", {
        error: "Usuario o constraseña incorrectos",
      });
    }
  } catch (error) {
    // ESTO NOS DIRÁ EL PROBLEMA EXACTO
    // console.error("ERROR DETALLADO EN EL CATCH:", error);
    return res.status(500).send("Error en el servidor: " + error.message);
  }
};
