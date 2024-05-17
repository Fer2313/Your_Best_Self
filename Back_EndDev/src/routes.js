import { Router } from "express";
import { Privado, Publico } from "./middlewares/authorization.js";
import multer from "multer";
import {
  getAllEjercicesRoute,
  getExerciseByIDRoute,
  getExerciseByNameRoute,
  getExercisesFilteredRoute,
  getExercisesLengthRoute,
  getExercisesQueryRoute,
} from "./routes/ejercicios.js";
import { getAllMusclesRoute, getMuscleByIDRoute } from "./routes/musculos.js";
import {
  registerUserRoute,
  loginUserRoute,
  authenticateJWT,
  getUserRoute,
} from "./routes/login.js";
import {
  crearEntrenamientoRoute,
  getAllTrainingsRoute,
  getTrainingByIdRoute,
  getTrainingLogByIDRoute,
  trainingLogRoute,
} from "./routes/entrenamientos.js";
import {
  VerifyUserRoute,
  actualizarUserRoute,
  changeEmailRoute,
  changePasswordRoute,
  deleteUserRoute,
  getAllUsersRoute,
  getUserByIdRoute,
  resetPasswordRoute,
  sendChangeEmailRoute,
  sendDeleteUserRoute,
  sendResetPasswordRoute,
  sendVerifyUserRoute,
  verifyResetPasswordRoute,
} from "./routes/user.js";
import { postImageFileRoute } from "./routes/filesUploadCloudinary.js";
import { deleteUserAdminRoute, reactivationUserAdminRoute } from "./routes/dashboard.js";

const router = Router();
const storage = multer.memoryStorage(); // Almacenar en memoria (puedes personalizar según tus necesidades)
const upload = multer({ storage: storage });

//Get

router.get("/", (req, res) => {
  res.json({ saludo: "Hola Mundo" });
});

router.get("/training/getTrainingLogById/:id", Publico, (req, res) => {
  getTrainingLogByIDRoute(req, res)
})

router.get("/allUsers", Publico, (req, res) => {
  getAllUsersRoute(req, res);
});
router.get("/user", Publico, (req, res) => {
  getUserRoute(req, res);
});

router.get("/user/:id", Publico, (req, res) => {
  getUserByIdRoute(req, res);
});

router.get("/exercise", Publico, (req, res) => {
  req.query.currentPage
    ? getExercisesQueryRoute(req, res)
    : getAllEjercicesRoute(req, res);
});

router.get("/training", Publico, (req, res) => {
  getAllTrainingsRoute(req, res);
});

router.get("/training/getTrainingByID/:id", Publico, (req, res) => {
  getTrainingByIdRoute(req, res);
});

router.get("/exercisesLength", Publico, (req, res) => {
  getExercisesLengthRoute(req, res);
});

router.get("/exercises/filters", Publico, (req, res) => {
  getExercisesFilteredRoute(req, res);
});

router.get("/exercise/getExerciseByID/:id", Publico, (req, res) => {
  getExerciseByIDRoute(req, res);
});

router.get("/exercise/getExercisesByName/:name", (req, res) => {
  getExerciseByNameRoute(req, res);
});

router.get("/muscle/getMuscleByID/:id", Publico, (req, res) => {
  getMuscleByIDRoute(req, res);
});

router.get("/muscle", Publico, (req, res) => {
  getAllMusclesRoute(req, res);
});

router.get("/admin/dashboard", authenticateJWT, (req, res) => {
  if (req.user.role !== "admin") {
    return res
      .status(404)
      .json({ error: "Acceso denegado. No eres administrador" });
  }

  res.json({ message: "Bienvenido al dashboard de administrador " });
});

//Post
router.post("/crearEntrenamito", Publico, (req, res) => {
  crearEntrenamientoRoute(req, res)
})

router.post("/training/trainingLog", Publico, (req, res) => {
  trainingLogRoute(req, res);
});

router.post("/sendVerifyUser", Publico, (req, res) => {
  sendVerifyUserRoute(req, res);
});

router.post("/verifyUser", (req, res) => {
  VerifyUserRoute(req, res);
});

router.post("/sendDeleteUser", Publico, (req, res) => {
  sendDeleteUserRoute(req, res);
});

router.post("/sendChangeEmail", Publico, (req, res) => {
  sendChangeEmailRoute(req, res);
});

router.post("/sendResetPassword", (req, res) => {
  sendResetPasswordRoute(req, res);
});

router.post("/verifyResetPassword", (req, res) => {
  verifyResetPasswordRoute(req, res);
});
router.patch("/resetPassword", (req, res) => {
  resetPasswordRoute(req, res);
})

router.post("/register", (req, res) => {
  registerUserRoute(req, res);
});

router.post("/cloudinary", upload.single("imagen"), Publico, (req, res) => {
  postImageFileRoute(req, res);
});

router.post("/login", (req, res) => {
  loginUserRoute(req, res);
});

//Patch

router.patch("/changeEmail", (req, res) => {
  changeEmailRoute(req, res);
});

router.patch("/changePassword", Publico, (req, res) => {
  changePasswordRoute(req, res);
});

router.patch("/user", Publico, (req, res) => {
  actualizarUserRoute(req, res);
});

router.patch("/reactivationUserAdmin/:id", Privado, (req, res) => {
  reactivationUserAdminRoute(req, res)
});



//Delete

router.delete("/deleteUser/:token", Publico, (req, res) => {
  deleteUserRoute(req, res);
});

router.delete("/deleteUserAdmin/:id", Privado, (req, res) => {
  deleteUserAdminRoute(req, res);
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

  */
