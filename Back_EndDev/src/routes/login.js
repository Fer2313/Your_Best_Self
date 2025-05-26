import { registerUser, loginUser, getUser } from "../handlers/login.js";
import jwt from "jsonwebtoken";

export async function registerUserRoute(req, res) {
  const { email, contraseña, nombre, edad, peso, altura, sexo, rol } = req.body;
  try {
    const result = await registerUser(
      email,
      contraseña,
      nombre,
      edad,
      peso,
      altura,
      sexo,
      rol
    );
    if (typeof result === "string") {
      return res.status(400).json({ message: result });
    }
    res
      .status(200)
      .json({ message: `Usuario ${nombre} ha sido registrado con exito` });
  } catch (error) {
    res.status(500).json({ error: "Error al registrar el usuario" });
  }
}

export function getUserRoute(req, res){
  const { token } = req.query
  try {
    const result = getUser(token)
    res.json(result)
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}

export async function loginUserRoute(req, res) {
  try {
    const token = await loginUser(req, res);
    res.json({
      status: "ok",
      message: "Usuario loggeado",
      token: { token },
      redirect: "/home",
    });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
}

export const authenticateJWT = (req, res, next) => {
  const token = req.header("Authorization");
  if (!token) {
    return res
      .status(404)
      .json({ error: "Token de autenticacion no proporcionada " });
  }

  jwt.verify(token, "secret_key", (error, user) => {
    if (error) {
      return res.status(404).json({ error: "Token de autenticacion invalida" });
    }
  });

  req.user = user;
  next();
};
