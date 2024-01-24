import { pool } from "../../db"


export async function crearEntrenamiento(entrenamiento, detalles){
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
}