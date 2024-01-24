import express from "express";
import cors from "cors";
import router from "./routes.js";

const app = express();

app.use(cors());

app.use(router);

app.use(express.json());

app.listen(3000);

console.log("Server running on port 3000");


