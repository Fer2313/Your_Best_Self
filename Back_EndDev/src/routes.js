import { Router } from "express";
import { Publico } from "./middlewares/authorization.js";
import {
  getAllEjercicesRoute,
  getExerciseByIDRoute,
  getExerciseByNameRoute,
  getExercisesFilteredRoute,
  getExercisesLengthRoute,
  getExercisesQueryRoute,
} from "./routes/ejercicios.js";
import { crearEntrenamiento } from "./handlers/entrenamiento.js";
import { getAllMusclesRoute, getMuscleByIDRoute } from "./routes/musculos.js";
import {
  registerUserRoute,
  loginUserRoute,
  authenticateJWT,
  getUserRoute,
} from "./routes/login.js";
import { getAllTrainingsRoute, getTrainingByIdRoute } from "./routes/entrenamientos.js";

const router = Router();

router.get("/", (req, res) => {
  res.send("Hola Mundo");
});
router.get("/user", Publico, (req, res) => {
  getUserRoute(req, res);
});
router.get("/exercise", Publico, (req, res) => {
  req.query.currentPage
    ? getExercisesQueryRoute(req, res)
    : getAllEjercicesRoute(req, res);
});
router.get("/training", Publico, (req,res) => {
    getAllTrainingsRoute(req, res)
})
router.get("/training/getTrainingByID/:id",Publico, (req,res)=>{
  getTrainingByIdRoute(req,res);
})
router.get("/exercisesLength", Publico, (req, res) => {
  getExercisesLengthRoute(req, res);
});
router.get("/exercises/filters", Publico, (req, res) => {
  getExercisesFilteredRoute(req, res);
});
router.get("/exercise/getExerciseByID/:id", Publico,  (req, res) => {
  getExerciseByIDRoute(req, res);
});
router.get("/exercise/getExercisesByName/:name", (req, res) => {
  getExerciseByNameRoute(req, res);
});
router.get("/muscle/getMuscleByID/:id", Publico,  (req, res) => {
  getMuscleByIDRoute(req, res);
});

router.get("/muscle", Publico,  (req, res) => {
  getAllMusclesRoute(req, res);
});

router.post("/crear-entrenamiento", async (req, res) => {
  try {
    const { entrenamiento, detalles } = req.body;
    const resultado = await crearEntrenamiento(entrenamiento, detalles);
    res.status(200).json(resultado);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "Error al procesar la solicitud" });
  }
});

router.get("/admin/dashboard", authenticateJWT, (req, res) => {
  if (req.user.role !== "admin") {
    return res
      .status(404)
      .json({ error: "Acceso denegado. No eres administrador" });
  }

  res.json({ message: "Bienvenido al dashboard de administrador " });
});

router.post("/register", (req, res) => {
  registerUserRoute(req, res);
});

router.post("/login", (req, res) => {
  loginUserRoute(req, res);
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
