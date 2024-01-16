// Express
import express from "express";
const app = express();

// PostgreSQL
import pgPromise from "pg-promise";
const PORT = 5432;
const USER = "admin";
const PASS = "Adivinala1.";
const DB_NAME = "db_tfg";
const db = pgPromise(`postgres://${USER}:${PASS}@host:${PORT}/${DB_NAME}`);

// Error codes
const OK = 200;
const FORBIDDEN = 403;
const NOT_FOUND = 404;
const INTERNAL_SERVER_ERROR = 500;


// TODO
app.get('/', (req, res) => {

})


app.listen(PORT, () => {
    console.log("Listening...");
})