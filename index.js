const express = require("express");
const { Client } = require("pg");

const app = express();
const port = 3000;

const client = new Client({
  host: process.env.PG_HOST,
  user: process.env.PG_USER,
  password: process.env.PG_PASSWORD,
  database: process.env.PG_DB,
  port: 5432,
});

client
  .connect()
  .then(() => console.log("Connected to Postgres"))
  .catch((err) => console.error("Connection error", err));

app.get("/", async (req, res) => {
  const result = await client.query("SELECT NOW()");
  res.send(result.rows);
});

app.listen(port, () => {
  console.log(`App running on port ${port}`);
});
