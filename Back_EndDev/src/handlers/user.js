import { pool } from "../../db.js";
import nodemailer from "nodemailer";
import bcrypt from "bcrypt";
import jsonwebtoken from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

export async function getUserById(id) {
  const [result] = await pool.query(
    `SELECT * FROM usuario Where id_usuario = ${id}`
  );
  const [registros] = await pool.query(
    `SELECT * FROM Registro_entrenamiento Where id_usuario = ${id}`
  )
  return result[0];
}
export async function getAllUsers(req) {
  const onlyemail = req.query;
  if (onlyemail.onlyemail) {
    const [result] = await pool.query(`SELECT email FROM usuario`);
    return result;
  }
  const [result] = await pool.query(
    `SELECT id_usuario,nombre,edad,peso,altura,sexo,email,rol,verify,imagen_perfil,pesoIdeal FROM usuario`
  );
  return result;
}
export async function sendVerifyUser(email, verificationLink) {
  const [result] = await pool.query(`
  SELECT id_usuario from usuario where email = "${email}"`);
  const { id_usuario } = result[0];
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true, // Use `true` for port 465, `false` for all other ports
    auth: {
      user: process.env.google_email,
      pass: process.env.google_apps_pasword,
    },
  });
  const hash = await bcrypt.hash(email, 10);
  const base64Hash = btoa(hash);
  const mailOptions = {
    from: process.env.google_email,
    to: email,
    subject: "Verificación de correo electrónico",
    html: `
    <div style="background: #38B6FF; padding: 2px; border-radius: 5px; display: flex;">
     <img width="200" src='https://res.cloudinary.com/dvp8rjepk/image/upload/v1710252705/logo/uevc85obhuptng2csbe7.png'>
    </div>
    <p>Haz clic en el siguiente enlace para verificar tu correo electrónico:</p>
    <a style="font-size: 16px;" href="${verificationLink}/${base64Hash}/${id_usuario}">Verifica aqui!</a>`,
  };
  return { transporter, mailOptions };
}
export async function sendResetPassword(email, verificationLink) {
  if (!email || !verificationLink) {
    throw Error("Faltan datos");
  }
  const [result2] = await pool.query(
    `SELECT email from usuario WHERE email = "${email}"`
  );

  if (!result2.length) {
    throw Error("Error al enviar el correo");
  }

  const tokenUpdate = jsonwebtoken.sign(
    { email },
    process.env.JWT_UPDATE_SECRET,
    { expiresIn: "10m" }
  );

  await pool.query(`UPDATE usuario
  SET update_token = "${tokenUpdate}"
  WHERE email = "${email}"`);

  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true, // Use `true` for port 465, `false` for all other ports
    auth: {
      user: process.env.google_email,
      pass: process.env.google_apps_pasword,
    },
  });

  const mailOptions = {
    from: process.env.google_email,
    to: email,
    subject: "Cambio de contraseña",
    html: `
    <div style="background: #38B6FF; padding: 2px; border-radius: 5px; display: flex;">
     <img width="200" src='https://res.cloudinary.com/dvp8rjepk/image/upload/v1710252705/logo/uevc85obhuptng2csbe7.png'>
    </div>
    <p>Haz clic en el siguiente enlace para cambiar su contraseña (Importante: Si usted no hizo esta orden NO CONFIRME EL CAMBIO):</p>
    <a style="font-size: 16px;" href="${verificationLink}/${tokenUpdate}">Confirma aqui!</a>`,
  };
  return { transporter, mailOptions };
}

export async function verifyResetPassword(token) {
  if (!token) {
    throw Error("No esta autorizado");
  }
  jsonwebtoken.verify(token, process.env.JWT_UPDATE_SECRET, (err, decoded) => {
    if (err) {
      throw Error("El token ha expirado");
    }
    if (decoded) {
      return true;
    }
  });
}

export async function resetPassword(token, password) {
  if (!token || !password) {
    throw Error("No se pudo cambiar la contraseña")
  }
  const hashPassword = await bcrypt.hash(password, 10);
  await pool.query(`UPDATE usuario
      SET contraseña = "${hashPassword}"
      WHERE update_token = "${token}"`);

  await pool.query(`UPDATE usuario
      SET update_token = ${null}
      WHERE update_token = "${token}"`);
  return true;
}

export async function sendChangeEmail(email, newEmail, verificationLink) {
  if (!email || !newEmail || !verificationLink) {
    throw Error("Faltan datos");
  }
  const [result2] = await pool.query(
    `SELECT id_usuario, email from usuario WHERE email = "${newEmail}"`
  );
  if (result2.length) {
    throw Error(
      "El email al que se quiere cambiar ya se encuentra en una de las cuentas"
    );
  }
  if (email) {
    const [result] = await pool.query(
      `SELECT id_usuario, email from usuario WHERE email = "${email}"`
    );
    if (result.length) {
      const tokenUpdate = jsonwebtoken.sign(
        { newEmail },
        process.env.JWT_UPDATE_SECRET,
        { expiresIn: "10m" }
      );
      await pool.query(`UPDATE usuario
      SET update_token = "${tokenUpdate}"
      WHERE id_usuario = ${result[0].id_usuario}`);
      const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 465,
        secure: true, // Use `true` for port 465, `false` for all other ports
        auth: {
          user: process.env.google_email,
          pass: process.env.google_apps_pasword,
        },
      });
      const mailOptions = {
        from: process.env.google_email,
        to: email,
        subject: "Cambio de correo",
        html: `
        <div style="background: #38B6FF; padding: 2px; border-radius: 5px; display: flex;">
         <img width="200" src='https://res.cloudinary.com/dvp8rjepk/image/upload/v1710252705/logo/uevc85obhuptng2csbe7.png'>
        </div>
        <p>Haz clic en el siguiente enlace para cambiar tu correo electrónico:</p>
        <a style="font-size: 16px;" href="${verificationLink}/${tokenUpdate}">Confirma aqui!</a>`,
      };
      return { transporter, mailOptions };
    } else {
      throw Error("El email indicado es incorrecto");
    }
  } else {
    throw Error("No se a ingresado el email");
  }
}

export async function changeEmail(token) {
  if (token) {
    let newEmail;
    jsonwebtoken.verify(
      token,
      process.env.JWT_UPDATE_SECRET,
      (err, decoded) => {
        if (err) {
          throw Error("El token ha expirado");
        }
        if (decoded) {
          newEmail = decoded.newEmail;
        }
      }
    );
    const [updateUser] = await pool.query(`UPDATE usuario
    SET email = "${newEmail}", verify = "false"
    WHERE update_token = "${token}"`);
    if (updateUser) {
      await pool.query(`UPDATE usuario
      SET update_token = ""
      WHERE update_token = "${token}"`);
      return "Cambio efectuado";
    } else {
      throw Error("El token ha expirado");
    }
  } else {
    throw Error("No se recibió el token");
  }
}

export async function changePassword(id, oldPassword, newPassword) {
  console.log(id, oldPassword, newPassword);
  const [userChangePass] = await pool.query(
    `SELECT contraseña from usuario WHERE id_usuario = ${id}`
  );
  const { contraseña } = userChangePass[0];
  if (userChangePass.length) {
    const comparenew = bcrypt.compareSync(newPassword, contraseña);
    if (comparenew) {
      throw Error("La nueva contraseña es igual a la actual");
    }
    const compare = bcrypt.compareSync(oldPassword, contraseña);
    if (compare) {
      const hashPassword = await bcrypt.hash(newPassword, 10);
      await pool.query(`UPDATE usuario
      SET contraseña = "${hashPassword}"
      WHERE id_usuario = ${id}`);
      return "Cambio efectuado";
    } else {
      throw Error("Error al cambiar la contraseña");
    }
  } else {
    throw Error("No se proporciono id");
  }
}

export async function sendDeleteUser(email, verificationLink) {
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: process.env.google_email,
      pass: process.env.google_apps_pasword,
    },
  });
  const [user] = await pool.query(
    `SELECT id_usuario from usuario WHERE email = "${email}"`
  );
  const id = user[0].id_usuario;
  const token = jsonwebtoken.sign(
    { id, email },
    process.env.JWT_DELETE_SECRET,
    { expiresIn: "10m" }
  );

  const mailOptions = {
    from: process.env.google_email,
    to: email,
    subject: "Eliminacion de la cuenta",
    html: `
    <div style="background: #38B6FF; padding: 2px; border-radius: 5px; display: flex;">
     <img width="200" src='https://res.cloudinary.com/dvp8rjepk/image/upload/v1710252705/logo/uevc85obhuptng2csbe7.png'>
    </div>
    <p>Haz clic en el siguiente enlace para confirmar la eliminacion de la cuenta:</p>
    <a style="font-size: 16px;" href="${verificationLink}/${token}">Elimina tu cuenta aqui, un gusto!</a>`,
  };
  return { transporter, mailOptions };
}

export async function deleteUser(token) {
  let id;
  jsonwebtoken.verify(token, process.env.JWT_DELETE_SECRET, (err, decoded) => {
    if (err) {
      throw Error("Algo a salido mal");
    }
    if (decoded) {
      id = decoded.id;
    }
  });

  await pool.query(`delete from usuario where id_usuario = ${id}`);
  return { status: "ok", message: "el usuario a sido borrado" };
}


export async function verifyUser(id, hashEmail) {
  const [result] = await pool.query(`
  SELECT email, verify from usuario where id_usuario = ${id}`);

  if (result.length) {
    const { email, verify } = result[0];
    let compare = bcrypt.compareSync(email, hashEmail);
    if (compare) {
      if (verify === "true") {
        return { status: "Este usuario esta verificado" };
      } else {
        await pool.query(`UPDATE usuario
        SET verify = 'true'
        WHERE id_usuario = ${id}`);
        return { status: "Este usuario esta verificado" };
      }
    } else {
      throw Error("Error al verificar");
    }
  }
}

export async function actualizarUser(req) {
  const { id, nombre, image, peso, pesoIdeal, altura, edad, genero } = req.body;
  if (!image && !peso && !pesoIdeal && !altura && !edad && genero) {
    throw Error("No se recibieron parametros");
  } else {
    if (nombre) {
      await pool.query(`UPDATE usuario
    SET nombre = '${nombre}'
    WHERE id_usuario = ${id}`);
    }
    if (image) {
      await pool.query(`UPDATE usuario
    SET imagen_perfil = '${image}'
    WHERE id_usuario = ${id}`);
    }
    if (peso) {
      await pool.query(`UPDATE usuario
    SET peso = '${peso}'
    WHERE id_usuario = ${id}`);
    }
    if (pesoIdeal) {
      await pool.query(`UPDATE usuario
    SET pesoIdeal = '${pesoIdeal}'
    WHERE id_usuario = ${id}`);
    }
    if (altura) {
      await pool.query(`UPDATE usuario
    SET altura = '${altura}'
    WHERE id_usuario = ${id}`);
    }
    if (edad) {
      await pool.query(`UPDATE usuario
    SET edad = '${edad}'
    WHERE id_usuario = ${id}`);
    }
    if (genero) {
      await pool.query(`UPDATE usuario
    SET sexo = '${genero}'
    WHERE id_usuario = ${id}`);
    }
    return { status: "ok", message: "Actualizado" };
  }
}

