import { pool } from "../../db.js";

export async function deleteUserAdmin(id) {
  const [user] = await pool.query(
    `SELECT email, rol from usuario where id_usuario = ${id}`
  );
  if (user.length) {
    const email = user[0].email;
    const rol = user[0].rol;
    if (rol === "admin") {
      throw Error(
        "El usuario que pretende eliminar es un administrador, debera realizar una consulta a la BD para proceder"
      );
    } else {
      if (email.includes("*")) {
        throw Error("El usuario ya a sido eliminado");
      }
      await pool.query(
        `UPDATE usuario set email = "${
          email + "****"
        }" where id_usuario = ${id}`
      );
    }
  } else {
    throw Error("No existe el usuario que quiere eliminar");
  }
}

export async function reactivacionUserAdmin(id) {
  const [user] = await pool.query(
    `SELECT email from usuario where id_usuario = ${id}`
  );
  if (user.length) {
    const email = user[0].email;
    if (!String(email).includes("*")) {
      console.log("USUARIO NO ESTA BLOQUEADO");
      return {
        msg: "Usuario no esta Bloqueado",
      };
    }

    const emailArray = email.split("*");
    const cleanEmail = emailArray.join("");
    await pool.query(
      `UPDATE usuario set email = "${cleanEmail}" where id_usuario = ${id}`
    );

    return {
      msg: "Usuario reactivado con exito",
      result: cleanEmail,
    };
  } else {
    throw Error("No existe ese usuario");
  }
}
