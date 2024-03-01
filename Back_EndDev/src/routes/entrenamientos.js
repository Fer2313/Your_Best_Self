import { getAllTrainings, getTrainingById } from "../handlers/entrenamiento.js";

export async function getAllTrainingsRoute(req,res){
    try {
        const result = await getAllTrainings();
        res.status(200).json(result);
      } catch (error) {
        res.status(400).send({ err: error.message });
      }
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