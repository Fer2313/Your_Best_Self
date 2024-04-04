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
