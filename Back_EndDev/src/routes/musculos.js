import { getAllMuscles, getMuscleById } from "../handlers/musculos.js";

export async function getAllMusclesRoute(req,res){
try {
    const result = await getAllMuscles()
    res.status(200).json(result)
} catch (error) {
    res.status(400).send({err:error.message});
}
}
export async function getMuscleByIDRoute(req, res){
try {
    const { id } = req.params;
    const result = await getMuscleById(id)
    res.status(200).json(result)
} catch (error) {
    res.status(400).send({err:error.message});
}
};