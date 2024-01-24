import { pool } from "../../db.js";

export async function getAllMuscles(){
    const [result] = await pool.query("SELECT * FROM Musculos");
    return result
}
export async function getMuscleById(id){
    const [result] = await pool.query(`SELECT * FROM Musculos WHERE id_musculo = ${id}`)
    return result
}