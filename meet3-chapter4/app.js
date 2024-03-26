const express = require("express");
const v1Router = require("./routes/v1/index.js")
const pg = require("pg");

const app = express();

app.use(express.json());
app.use('/v1', v1Router)

app.listen(3000, () => {
  console.log("Server is running on port http://localhost:3000");
});



