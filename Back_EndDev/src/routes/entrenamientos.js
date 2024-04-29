import { getAllTrainings, getTrainingById, getTrainingLogById, trainingLog } from "../handlers/entrenamiento.js";

export async function getAllTrainingsRoute(req,res){
    try {
        const result = await getAllTrainings();
        res.status(200).json(result);
      } catch (error) {
        res.status(400).send({ err: error.message });
      }
}
export async function crearEntrenamientoRoute(req,res){
  
}

export async function getTrainingByIdRoute(req,res){
  try {
    const { id } = req.params
    const result = await getTrainingById(id);
    res.status(200).json(result);
  } catch (error) {
    res.status(400).send({ err: error.message });
  }
}
export async function getTrainingLogByIDRoute(req,res){
  try {
    const { id } = req.params
    const result = await getTrainingLogById(id);
    res.status(200).json(result);
  } catch (error) {
    res.status(400).send({ err: error.message });
  }
}
export async function trainingLogRoute(req, res){
 const {id_usuario, id_entrenamiento, fecha, kcal} = req.body;
  try {
    await trainingLog(id_usuario, id_entrenamiento, fecha, kcal);
    res.status(200).json({ status:"ok", message: "Registro de entrenamiento subido"});
  } catch (error) {
    res.status(400).send({ err: error.message });
  }
};