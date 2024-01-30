import { pool } from "../../db.js"
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';


export async function registerUser(username, password, age, weight, height, gender, role = 'admin') {

    const connection = await pool.promise().getConnection();

    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const query = 'INSERT INTO usuario (username, password, age, weight, height, gender, role) VALUES (?,?,?,?,?,?)';
        await connection.query.execute(query, [username, hashedPassword, age, weight, height, gender, role]);

        console.log(`Usuario "${username}" registrado con exito`);
        return true;
    } catch (error) {
        console.log('Error al registrar el usuario', error.message);
        return false;
    }
}

export async function loginUser(username, password){
   try {
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
   } 
}

