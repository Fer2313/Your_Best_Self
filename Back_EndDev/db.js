import { createPool } from "mysql2/promise"

const host = process.env.host;
const user = process.env.user;
const password = process.env.password;
const port = process.env.port;
const database = process.env.database;

const host = process.env.host;
const user = process.env.user;
const password = process.env.password;
const port = process.env.port;
const database = process.env.database;

export const pool = createPool({
    host:`${host}`,
    user:`${user}`,
    password:`${password}`,
    port:`${port}`,
    database:`${database}`
}) 
