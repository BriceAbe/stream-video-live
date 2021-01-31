const express = require("express");

const app = express();

app.get("/", (req, res) => {
  console.log("start");
  res.json("hello world");
});

app.listen(3045, () => {
  console.log("server start");
});
