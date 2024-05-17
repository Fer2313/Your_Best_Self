import { pool } from "../../db.js";

export async function getAllMuscles(){
    const [result] = await pool.query("SELECT * FROM musculos");
    return result
}
export async function getMuscleById(id){
    const [result] = await pool.query(`SELECT * FROM musculos WHERE id_musculo = ${id}`)
    return result
}