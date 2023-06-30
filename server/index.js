const express = require("express");
const bodyParser = require("body-parser");
const port = 3000;

const app = express();

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.listen(port, () => {
  console.log(`App is listening at the port ${port}`);
});
