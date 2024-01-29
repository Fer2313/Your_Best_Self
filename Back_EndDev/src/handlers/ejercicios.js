import { pool } from "../../db.js";

export async function getExercisesQuery(req) {
  const { currentPage, itemsPerPage, tabla } = req.query;
  const offset = (currentPage - 1) * itemsPerPage;
  const [result] = await pool.query(
    `SELECT * FROM ${tabla} ORDER BY id_ejercicios LIMIT ${offset}, ${itemsPerPage};`
  );
  return result;
}

export async function getExercisesFiltered(categoria, dificultad, Musculos) {
  if (Musculos) {
    let arr = JSON.parse(Musculos);
    let value = "?";
    let concat = "";
    if (arr.length > 1) {
      for (let index = 1; index < arr.length; index++) {
        concat += "," + value;
      }
      value = value + concat;
    }
    if (Musculos && categoria && dificultad) {
      const [result] = await pool.query(
        `SELECT DISTINCT E.Id_ejercicios AS Id_ejercicios, E.nombre_ejercicios AS nombre_ejercicios, E.Descripcion AS descripcion, E.Video AS video, E.Imagen AS imagen, E.categoria AS categoria, E.dificultad AS dificultad FROM Ejercicios E JOIN EjercicioMusculo EM ON E.Id_ejercicios = EM.Id_ejercicios WHERE E.categoria = "${categoria}" AND E.dificultad = "${dificultad}" AND EM.id_musculo IN (${value})`,
        arr
      );
      return result;
    } else if (Musculos && categoria) {
      const [result] = await pool.query(
        `SELECT DISTINCT E.Id_ejercicios AS Id_ejercicios, E.nombre_ejercicios AS nombre_ejercicios, E.Descripcion AS descripcion, E.Video AS video, E.Imagen AS imagen, E.categoria AS categoria, E.dificultad AS dificultad FROM Ejercicios E JOIN EjercicioMusculo EM ON E.Id_ejercicios = EM.Id_ejercicios WHERE E.categoria = "${categoria}" AND EM.id_musculo IN (${value})`,
        arr
      );
      return result;
    } else if (Musculos && dificultad) {
      const [result] = await pool.query(
        `SELECT DISTINCT E.Id_ejercicios AS Id_ejercicios, E.nombre_ejercicios AS nombre_ejercicios, E.Descripcion AS descripcion, E.Video AS video, E.Imagen AS imagen, E.categoria AS categoria, E.dificultad AS dificultad FROM Ejercicios E JOIN EjercicioMusculo EM ON E.Id_ejercicios = EM.Id_ejercicios WHERE E.dificultad = "${dificultad}" AND EM.id_musculo IN (${value})`,
        arr
      );
      return result;
    } else if (Musculos) {
      const [result] = await pool.query(
        `SELECT DISTINCT E.Id_ejercicios AS Id_ejercicios, E.nombre_ejercicios AS nombre_ejercicios, E.Descripcion AS descripcion, E.Video AS video, E.Imagen AS imagen, E.categoria AS categoria, E.dificultad AS dificultad FROM Ejercicios E JOIN EjercicioMusculo EM ON E.Id_ejercicios = EM.Id_ejercicios WHERE EM.id_musculo IN (${value})`,
        arr
      );
      return result;
    }
  } else if (categoria && dificultad) {
    const [result] = await pool.query(
      `SELECT * FROM ejercicios WHERE dificultad = "${dificultad}" AND categoria = "${categoria}"`
    );
    return result;
  } else if (dificultad) {
    const [result] = await pool.query(
      `SELECT * FROM ejercicios WHERE dificultad = "${dificultad}"`
    );
    return result;
  } else if (categoria) {
    const [result] = await pool.query(
      `SELECT * FROM ejercicios WHERE categoria = "${categoria}"`
    );
    return result;
  }
}

export async function getExercisesLength() {
  const [result] = await pool.query("SELECT COUNT(*) FROM ejercicios;");
  return result[0]["COUNT(*)"];
}

export async function getAllEjercices() {
  const [result] = await pool.query("SELECT * FROM Ejercicios");
  return result;
}

export async function getEjercicesById(id) {
  const [musclesAsociates] = await pool.query(
    `SELECT M.id_musculo AS id_Musculos, M.nombre_musculo AS nombre_Musculos, M.imagen_musculo AS imagen_musculos FROM Musculos M JOIN EjercicioMusculo EM ON M.id_musculo = EM.id_musculo WHERE EM.id_ejercicios = ${id};`
  );
  const [result] = await pool.query(
    `SELECT * FROM EJERCICIOS WHERE ID_EJERCICIOS = ${id};`
  );
  result[0]["musculosRelacionados"] = musclesAsociates;
  return result[0];
}
export async function getExerciseByName(name){

}
