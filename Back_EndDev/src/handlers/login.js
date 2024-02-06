import { pool } from "../../db.js"
import bcrypt from 'bcrypt';
import dotenv from 'dotenv'

dotenv.config()

import jsonwebtoken from 'jsonwebtoken';


export async function registerUser( email, contraseña, nombre, edad, peso, altura, sexo, rol ) {
    const [user] = await pool.query(`SELECT nombre FROM usuario WHERE email = "${email}"`)
    if (user.length) {
        return "Ese usuario ya esta registrado"
    }else{
        const hashedPassword = await bcrypt.hash(contraseña, 10);
        const query = 'INSERT INTO usuario (email, contraseña, nombre, edad, peso, altura, sexo, rol) VALUES (?,?,?,?,?,?,?,?)';
        const [result] = await pool.query(query, [email, hashedPassword, nombre, edad, peso, altura, sexo, rol])
        return result;
    }
}

export async function loginUser(email, contraseña) {
  const [user] = await pool.query(`SELECT nombre, contraseña FROM usuario where email = '${email}'`)
  if (!user.length) {
    throw new Error("La contraseña y/o el email son incorrectos")
  }
  const password = user[0].contraseña
  const usuario = user[0].nombre
  let compare = bcrypt.compareSync(contraseña, password)
  if(compare) {
    const token = jsonwebtoken.sign({
      user:usuario
    }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES})
    const cookieOptions = {
      expired: new Date(Date.now() + process.env.JWT_COOKIE_EXPIRATION * 24 * 60 * 60 * 1000),
      path: "/"
    }
    const data = {
      token,
      cookieOptions
    }
    return data
  }else {
    throw new Error("La contraseña y/o el email son incorrectos")
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