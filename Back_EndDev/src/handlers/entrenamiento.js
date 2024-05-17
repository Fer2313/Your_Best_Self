import { pool } from "../../db.js"

export async function getAllTrainings(){
    const [entren] = await pool.query("SELECT * FROM entrenamiento WHERE id_entrenamiento = 1");
    return entren
}

export async function getTrainingLogById(id){

}

export async function getTrainingById(id){
    const [entren] = await pool.query("SELECT * FROM entrenamiento WHERE id_entrenamiento =" + id);
    const [exercise] = await pool.query(`SELECT
    E.Id_ejercicios AS Id_ejercicios,
    E.nombre_ejercicios AS nombre_ejercicios,
    E.Descripcion AS descripcion,
    E.Video AS video,
    E.Imagen AS imagen,
    E.categoria AS categoria,
    E.dificultad AS dificultad,
    ED.series AS series,
    ED.repeticiones AS repeticiones,
    ED.tiempo AS tiempo,
    ED.lado AS lado
    FROM ejercicios E
    JOIN detalle_ejercicio ED ON E.Id_ejercicios = ED.Id_ejercicios
    WHERE ED.id_entrenamiento = ${id}`);
    entren[0]["ejercicios_relacionados"] = exercise
    return entren[0]
}

export async function trainingLog(id_usuario, id_entrenamiento, fecha, kcal){
    if (!id_usuario || !id_entrenamiento || !fecha || !kcal) {
        throw Error("Faltan datos")
    }
    const query =
    "INSERT INTO Registro_entrenamiento (id_usuario, id_entrenamiento, fecha, kcal) VALUES (?,?,?,?)";
    await pool.query(query,[id_usuario, id_entrenamiento, fecha, kcal])
    return true
}


/* export async function crearEntrenamiento(entrenamiento, detalles){
    const connection = await pool.promise().getConnection();

    try {
        // insertar entrenamiento en la tabla 'entrenamiento'
        const [entrenamientoResult] = await connection.query('INSERT INTO entrenamiento SET ?', entrenamiento);
        const idEntrenamiento = entrenamientoResult.insertId;

        // insertar detalles del entrenamiento en la tabla 'detalle_entrenamiento'
        const detallesQuery = detalles.map(detalle => [idEntrenamiento, detalle.id_usuario, detalle.id_ejercicios, detalle.series, detalle.repeticiones, detalle.tiempo]);
        await connection.query('INSERT INTO detalle_entrenamientos (id_entrenamiento, id_usuario, id_ejercicios, series, repeticiones, tiempo) VALUES ?', [detallesQuery]);

        return { mensaje: 'Entrenamiento creado exitosamente' };
    } catch (error) {
        console.error(error);
        throw new Error('Error al crear el entrenamiento')
    } finally {
        connection.release();
    }
} */