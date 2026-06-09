const db = require("../db");

exports.buscarUsuario = async (cedula) => {
  const query = "Select * from personales where cedula = $1";
  const result = await db.query(query, [cedula]);
  return result.rows[0];
};
