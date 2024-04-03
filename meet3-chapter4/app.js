const express = require("express");
const v1Router = require("./routes/v1/index.js")
const pg = require("pg");

const swaggerUI = require('swagger-ui-express');
const fs = require('fs');
const YAML = require('yaml');
const app = express();

const file = fs.readFileSync('./api-docs.yaml', 'utf8');
const swaggerDocument = YAML.parse(file);

const cors = require('cors');

app.use(cors());

app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocument));

app.use(express.json());
app.use('/v1', v1Router)

app.listen(3000, () => {
  console.log("Server is running on port http://localhost:3000");
});



