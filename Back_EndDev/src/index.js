import express from "express";
import cors from "cors";
import router from "./routes.js";
import dotenv from 'dotenv';
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000
//Inicio de servidor
app.listen(PORT,"0.0.0.0",()=>{
 console.log("Server localhost running on port "+ PORT);
});


//Configuracion
const allowedOrigins = ['https://your-best-self.vercel.app', 'http://localhost:4200'];
const corsOptions = {
    origin: function (origin, callback) {
      // Verifica si el origen de la solicitud está en la lista de orígenes permitidos
      if (allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error('Acceso no permitido desde el origen especificado'));
      }
    },
  };
app.use(cors(corsOptions));
app.use(express.json())
app.use(express.urlencoded({ extended: true }))


//Rutas
app.use(router); 

//endpointNotFound
app.use((req,res)=>{
res.status(404).json({
    message:"endpoint Not Found"
})
})







