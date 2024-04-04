import { pool } from "../../db.js";
import bcrypt from "bcrypt";
import jsonwebtoken from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export async function registerUser(
  email,
  contraseña,
  nombre,
  edad,
  peso,
  altura,
  sexo,
  rol
) {
  const [user] = await pool.query(
    `SELECT nombre FROM usuario WHERE email = "${email}"`
  );
  if (user.length) {
    return "Ese usuario ya esta registrado";
  } else {
    const hashedPassword = await bcrypt.hash(contraseña, 10);
    const query =
      "INSERT INTO usuario (email, contraseña, nombre, edad, peso, altura, sexo, rol) VALUES (?,?,?,?,?,?,?,?)";
    const [result] = await pool.query(query, [
      email,
      hashedPassword,
      nombre,
      edad,
      peso,
      altura,
      sexo,
      rol,
    ]);
    return result;
  }
}

export function getUser(token) {
  let user;
  jsonwebtoken.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      throw Error({"Error al verificar el token": err});
    } else {
      user = {
        idUsuario: decoded.user,
        nombreUsuario: decoded.username,
        imagen: decoded.imagen,
        rol: decoded.rol,
      };
    }
  });
  return user;
}

export async function loginUser(req, res) {
  if (req.body.name) {
    const { name, picture, email, email_verified, nickname } = req.body;
    const [user] = await pool.query(
      `SELECT * FROM usuario where email = '${email}'`
    );
    if (email) {
      if (user.length) {
        console.log("hola")
        if (user[0].verify === "false") {
          await pool.query(`UPDATE usuario
          SET verify = "${email_verified}"
          WHERE email = "${email}"`);
        }
        if (!user[0].imagen_perfil) {
          await pool.query(`UPDATE usuario
          SET imagen_perfil = "${picture}"
          WHERE email = "${email}"`);
        }
      } else {
        const query =
          "INSERT INTO usuario (email, nombre, imagen_perfil, verify) VALUES (?,?,?,?)";
        await pool.query(query, [email, name, picture, email_verified]);
      }
    } else {
      if (!user.length) {
        const query =
          "INSERT INTO usuario (email, nombre, imagen_perfil, verify) VALUES (?,?,?,?)";
        await pool.query(query, [nickname, name, picture, email_verified]);
      } else {
        if (user[0].verify === "false") {
          await pool.query(`UPDATE usuario
          SET verify = "${email_verified}"
          WHERE email = "${email}"`);
        }
        if (!user[0].imagen_perfil) {
          await pool.query(`UPDATE usuario
          SET imagen_perfil = "${picture}"
          WHERE email = "${email}"`);
        }
      }
    }
    const token = jsonwebtoken.sign(
      {
        user: user[0].id_usuario,
        username: user[0].nombre,
        imagen: user[0].imagen_perfil,
        rol: user[0].rol,
      },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES }
    );
    return token;
  }
 
  const { email, contraseña } = req.body;
  const [user] = await pool.query(
    `SELECT * FROM usuario where email = '${email}'`
  );
  if (!user.length || !user[0].contraseña) {
    throw new Error("La contraseña y/o el email son incorrectos");
  }
  const password = user[0].contraseña;
  let compare = bcrypt.compareSync(contraseña, password);
  if (compare) {
    const token = jsonwebtoken.sign(
      {
        user: user[0].id_usuario,
        username: user[0].nombre,
        imagen: user[0].imagen_perfil,
        rol: user[0].rol,
      },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES }
    );
    return token;
  } else {
    throw new Error("La contraseña y/o el email son incorrectos");
  }
}

/*  try {
    const query = 'SELECT * FROM usuario WHERE username = ?';
    const [results, fields] = await pool.promise().execute(query, [username]);

    if(results.length === 0){
        throw new Error('Credenciales invalidas');
    }

    const user = results[0];
    const passwordMatch = await bcrypt.compare(password, user.password);

    if(!passwordMatch){
        throw new Error('Credenciales invalidas');
    }

    const token = jwt.sign({ username: user.username, role: user.role }, 'secret_key');
    console.log(`Usuario ${username} ha iniciado sesion`);
    return token;
   } catch (error) {
    console.log('Error al iniciar sesion: ', error.message);
    throw error;
   }  */
