import { pool } from "../../db.js";


export async function deleteUserAdmin(id) {
    const [user] = await pool.query(`SELECT email from usuario where id_usuario = ${id}`);

    const email = user[0].email;
    if (user.length) {
        await pool.query(`UPDATE usuario set email = "${email + "****"}" where id_usuario = ${id}`);
    }
};

export async function reactivacionUserAdmin(id) {
    const [user] = await pool.query(`SELECT email from usuario where id_usuario = ${id}`);

    const email = user[0].email;
    if (!String(email).includes('*')) {
        console.log("USUARIO NO ESTA BLOQUEADO");
        return {
            "msg": "Usuario no esta Bloqueado",
        };
    };

    const emailArray = email.split("*");
    const cleanEmail = emailArray.join("");
    await pool.query(`UPDATE usuario set email = "${cleanEmail}" where id_usuario = ${id}`);

    return {
        "msg": "Usuario reactivado con exito",
        "result": cleanEmail
    };

};



