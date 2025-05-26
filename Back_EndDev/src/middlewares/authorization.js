import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export function Publico(req, res, next) {
  if (!req.headers["authorization"]) {
    return res.status(400).json({ error: "Debes incluir el header con el token" });
  }
  const token = req.headers["authorization"];
  let payload;
  try {
    payload = jwt.verify(token, process.env.JWT_SECRET);
  } catch (error) {
    return res.status(400).json({ error: "El token proporcionado es invalido" });
  }

  next();
}

export const Privado = (req, res, next) => {
  if (!req.headers["authorization"]) {
    return res.status(400).json({ error: "Debes incluir el header con el token" });
  };
  const token = req.headers["authorization"];
  let rol;

  try {
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        throw Error("Algo a salido mal");
      }
      if (decoded) {
        rol = decoded.rol;
      }
    });
    if (rol === "admin") {
      next();
    } else {
      return res.status(400).json({ error: "Acceso denegado" });
    }

  } catch (error) {
    console.log("error==========>", error)
    return res.status(400).json({ error: "El token proporcionado es invalido" });
  }





};