import {
  getAllEjercices,
  getEjercicesById,
  getExercisesFiltered,
  getExercisesLength,
  getExercisesQuery,
} from "../handlers/ejercicios.js";

export async function getExercisesQueryRoute(req, res) {
  try {
    const result = await getExercisesQuery(req);
    res.status(200).json(result);
  } catch (error) {
    res.status(400).send({ err: error.message });
  }
}

export async function getExercisesFilteredRoute(req, res) {
  try {
    const { categoria, dificultad, Musculos } = req.query;
    const result = await getExercisesFiltered(categoria, dificultad, Musculos);
     if (result.length === 0) {
      return res.status(404).send("No se ha encontrado los ejercicios que buscas")
    }
    res.status(200).json(result);
   
  } catch (error) {
    res.status(400).send({ err: error.message });
  }
}

export async function getExercisesLengthRoute(req, res) {
  try {
    const result = await getExercisesLength(req, res);
    res.status(200).json(result);
  } catch (error) {
    res.status(400).send({ err: error.message });
  }
}

export async function getAllEjercicesRoute(req, res) {
  try {
    const result = await getAllEjercices();
    res.status(200).json(result);
  } catch (error) {
    res.status(400).send({ err: error.message });
  }
}

export async function getExerciseByIDRoute(req, res) {
  try {
    const { id } = req.params;
    const result = await getEjercicesById(id);
    res.status(200).json(result);
  } catch (error) {
    res.status(400).send({ err: error.message });
  }
}
