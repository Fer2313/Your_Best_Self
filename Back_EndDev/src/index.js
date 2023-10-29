import  express  from "express";

const app = express()

app.listen(3000)

app.use(express.json())

app.get("/",(req,res) => res.send("hola mundo"))

console.log("Server running on port 3000")