import express from "express";
import cors from "cors";
import router from "./routes.js";
import cookieParser from "cookie-parser";

const app = express();

//Inicio de servidor
app.listen(3000,()=>{
 console.log("Server localhost running on port 3000");
});

//Configuracion
app.use(cors());
app.use(cookieParser())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))


//Rutas
app.use(router);




