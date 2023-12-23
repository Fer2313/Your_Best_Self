import  express  from "express";
import { pool } from "../db.js";
import  cors  from "cors"

const app = express()
app.use(cors());

app.get("/",(req,res) => res.send("hola mundo"))

 app.get("/exercise", async (req,res)=> {
   const [result] = await pool.query("SELECT * FROM Ejercicios")
   res.json(result)
}) 
 app.get("/muscle", async (req,res)=> {
   const [result] = await pool.query("SELECT * FROM Musculos")
   res.json(result)
}) 
 app.get("/muscleExercise", async (req,res)=> {
   const [result] = await pool.query("SELECT * FROM ejercicioMusculo")
   res.json(result)
}) 
 app.get("/muscleR", async (req,res)=> {
   const [result] = await pool.query("SELECT M.id_musculo AS id_Musculos, M.nombre_musculo AS nombre_Musculos, M.imagen_musculo AS imagen_musculos FROM Musculos M JOIN EjercicioMusculo EM ON M.id_musculo = EM.id_musculo WHERE EM.id_ejercicios = 4;")
   res.json(result)
}) 
 app.get("/ejerciceR", async (req,res)=> {
   const [result] = await pool.query("SELECT E.EjercicioID AS Id_ejercicios, E.Nombre AS nombre_ejercicios, E.Descripcion, E.Video, E.Imagen AS imagen FROM Ejercicios E JOIN EjercicioMusculo EM ON E.EjercicioID = EM.EjercicioID WHERE EM.MusculoID = 1;")
   res.json(result)
}) 

app.listen(3000)

app.use(express.json())


console.log("Server running on port 3000")