const db = require("../db");

exports.obtenerPorCedula = async (cedula) => {
  const res = await db.query('SELECT * FROM "personales" WHERE cedula = $1', [
    cedula,
  ]);
  return res.rows[0]; // Devuelve el primer resultado encontrado
};
