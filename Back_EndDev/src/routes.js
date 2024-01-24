import { Router } from "express";
import {
  getAllEjercicesRoute,
  getExerciseByIDRoute,
  getExercisesFilteredRoute,
  getExercisesLengthRoute,
  getExercisesQueryRoute,
} from "./routes/ejercicios.js";
import { createTraining } from "./handlers/crearEntrenamiento.js"
import { getAllMusclesRoute, getMuscleByIDRoute } from "./routes/musculos.js";

const router = Router();

router.get("/", (req, res) => {
  res.send("Hola Mundo");
});
router.get("/exercise", (req, res) => {
  req.query.currentPage
    ? getExercisesQueryRoute(req, res)
    : getAllEjercicesRoute(req, res);
});
router.get("/exercisesLength", (req, res) => {
getExercisesLengthRoute(req, res)    
});
router.get("/exercises/filters", (req, res) => {
getExercisesFilteredRoute(req, res)    
});
router.get("/exercise/getExerciseByID/:id", (req, res) => {
  getExerciseByIDRoute(req, res);
});
router.get("/muscle/getMuscleByID/:id", (req, res) => {
  getMuscleByIDRoute(req, res);
});

router.get("/muscle", (req, res) => {
  getAllMusclesRoute(req, res);
});

router.post('/crear-entrenamiento', async (req, res) => {
  try {
    const { entrenamiento, detalles } = req.body;
    const resultado = await createTraining(entrenamiento, detalles);
    res.status(200).json(resultado);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: 'Error al procesar la solicitud' });
  }
});

export default router;

/*  app.get("/muscleR", async (req,res)=> {
   const [result] = await pool.query("SELECT M.id_musculo AS id_Musculos, M.nombre_musculo AS nombre_Musculos, M.imagen_musculo AS imagen_musculos FROM Musculos M JOIN EjercicioMusculo EM ON M.id_musculo = EM.id_musculo WHERE EM.id_ejercicios = 4;")
   res.json(result)
}) 
 app.get("/ejerciceR", async (req,res)=> {
   const [result] = await pool.query("SELECT E.EjercicioID AS Id_ejercicios, E.Nombre AS nombre_ejercicios, E.Descripcion, E.Video, E.Imagen AS imagen FROM Ejercicios E JOIN EjercicioMusculo EM ON E.EjercicioID = EM.EjercicioID WHERE EM.MusculoID = 1;")
   res.json(result)
})  
  router.get("/muscleExercise", async (req, res) => {
    const [result] = await pool.query("SELECT * FROM ejercicioMusculo");
    res.json(result);
  });
  */
