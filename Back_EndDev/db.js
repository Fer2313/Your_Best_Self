import { createPool } from "mysql2/promise"
import dotenv from 'dotenv';
dotenv.config();

const host = process.env.DB_host;
const user = process.env.DB_user;
const password = process.env.DB_password;
const port = process.env.DB_port;
const database = process.env.DB_name;



export const pool = createPool({
    host:`${host}`,
    user:`${user}`,
    password:`${password}`,
    port:`${port}`,
    database:`${database}`
}) 
