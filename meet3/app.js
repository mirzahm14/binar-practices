const express = require("express");
const pg = require("pg");

const app = express();

const client = new pg.Client({
  user: "mirza",
  host: "localhost",
  database: "practice",
  password: "12345",
  port: 5432,
}).connect();

app.use(express.json());

app.post("/api/apartments", async (req, res) => {
  try {
    const result = await client.query(
      "INSERT INTO apartments (building_name, floor_number, rent_price, is_available) VALUES ($1, $2, $3, $4) RETURNING *",
      [
        req.body.building_name,
        req.body.floor_number,
        req.body.rent_price,
        req.body.is_available,
      ],
    );
    res.status(201).json(result.rows);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

app.get("/api/apartments", async (req, res) => {
  try {
    const result = await client.query(
      "SELECT id, building_name FROM apartments ORDER BY id",
    );
    res.status(200).json(result.rows);
  } catch (error) {
    res.status(400);
  }
});

app.get("/api/apartments/:id", async (req, res) => {
  try {
    const result = await client.query(
      "SELECT * FROM apartments where id = $1",
      [req.params.id],
    );
    res.status(200).json(result.rows);
  } catch (error) {
    res.status(400);
  }
});

app.put("/api/apartments/:id", async (req, res) => {
  try {
    const entries = Object.entries(req.body);
    const values = entries.map(([, value]) => value);

    const setClause = entries
      .map(([key, value]) => `${key} = $${values.indexOf(value) + 2}`)
      .join(", ");

    const result = await client.query(`UPDATE apartments SET ${setClause} WHERE id = $1 RETURNING *`, [req.params.id, ...values]);

    res.status(202).json(result.rows);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

app.delete("/api/apartments/:id", async (req, res) => {
  try {
    const result = await client.query("DELETE FROM apartments WHERE id = $1 RETURNING *", [req.params.id]);
    res.status(203).json(result.rows);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

app.listen(3000, () => {
  console.log("Server is running on port http://localhost:3000");
});
