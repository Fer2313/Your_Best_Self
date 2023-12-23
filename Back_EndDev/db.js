 import { createPool } from "mysql2/promise"

export const pool = createPool({
    host:"localhost",
    user:"root",
    password:"leonor2003",
    port:"3306",
    database:"yourbestself"
}) 