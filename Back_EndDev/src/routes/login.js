import { registerUser, loginUser } from "../handlers/login";
const jwt = require('jsonwebtoken');

export async function registerUserRoute(req, res){
    const { username, password } = req.body;
    try {
        await registerUser(username, password);
        res.status(200).json({ message: 'Usuario registrado con exito' });
    } catch (error) {
        res.status(500).json({ error: 'Error al registrar el usuario' });
    }
};

export async function loginUserRoute (req, res){
    const { username, password } = req.body;

    try {
        const token = await loginUser(username, password);
        res.json({ token });
    } catch (error) {
        res.status(404).json({ error: 'Credenciales invalidas'});
    }
}

export const authenticateJWT  = (req, res, next) =>{
    const token = req.header('Authorization');

    if(!token){
        return res.status(404).json({ error: 'Token de autenticacion no proporcionada '});
    }

    jwt.verify(token, 'secret_key', (error, user) => {
        if(error){
            return res.status(404).json({ error: 'Token de autenticacion invalida'});
        }
    })

    req.user = user;
    next()
}