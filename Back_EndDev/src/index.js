import express from "express";
import cors from "cors";
import router from "./routes.js";


const app = express();

//Inicio de servidor
app.listen(3000,()=>{
 console.log("Server localhost running on port 3000");
});


//Configuracion
app.use(cors());
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







