const router = require("express").Router();
const pg = require("pg");
const client = new pg.Client({
  user: "mirza",
  host: "localhost",
  database: "practice",
  password: "12345",
  port: 5432,
})

client.connect()

router.post("/apartments", async (req, res) => {
  const { building_name, floor_number, rent_price, is_available } = req.body;
  if (!building_name || !floor_number || !rent_price || !is_available) {
    return res.status(400).json({ message: "All attribute must fulfilled" });
  }
  try {
    const result = await client.query(
      "INSERT INTO apartments (building_name, floor_number, rent_price, is_available) VALUES ($1, $2, $3, $4) RETURNING *",
      [building_name, floor_number, rent_price, is_available],
    );
    res.status(201).json({ message: "success", data: result.rows });
  } catch (error) {
    res.status(400).json({ message: "failed", data: error.message });
  }
});

router.get("/apartments", async (req, res) => {
  try {
    const result = await client.query(
      "SELECT id, building_name FROM apartments ORDER BY id",
    );
    res.status(200).json({ message: "success", data: result.rows });
  } catch (error) {
    res.status(400).json({ message: "failed", data: error.message });
  }
});

router.get("/apartments/:id", async (req, res) => {
  try {
    const result = await client.query(
      "SELECT * FROM apartments where id = $1",
      [req.params.id],
    );
    res.status(200).json({ message: "success", data: result.rows });
  } catch (error) {
    res.status(400).json({ message: "failed", data: error.message });
  }
});

router.put("/apartments/:id", async (req, res) => {
  try {
    const entries = Object.entries(req.body);
    const values = entries.map(([, value]) => value);

    const setClause = entries
      .map(([key, value]) => `${key} = $${values.indexOf(value) + 2}`)
      .join(", ");

    const result = await client.query(
      `UPDATE apartments SET ${setClause} WHERE id = $1 RETURNING *`,
      [req.params.id, ...values],
    );

    res.status(202).json({ message: "success", data: result.rows });
  } catch (error) {
    res.status(400).json({ message: "failed", data: error.message });
  }
});

router.delete("/apartments/:id", async (req, res) => {
  try {
    const result = await client.query(
      "DELETE FROM apartments WHERE id = $1 RETURNING *",
      [req.params.id],
    );
    res.status(203).json({ message: "success", data: result.rows });
  } catch (error) {
    res.status(400).json({ message: "failed", data: error.message });
  }
});

module.exports = router