const express = require("express");

const app = express();

// creation d un server http
const server = require("http").Server(app);

// generer des id unique
const { v4: uuid } = require("uuid");

const PORT = process.env.PORT || 3045;

// utilisation de  moteur de fichier ejs
app.set("view engine", "ejs");

// utilisation de fichier static
app.use(express.static("public"));

app.get("/:room", (req, res) => {
  const id = req.params.room;
  res.status(200).render("room", { roomId: id });
});

app.get("/", (req, res) => {
  res.redirect(`/${uuid()}`);
  // res.status(200).render("room");
});

server.listen(PORT, () => {
  console.log("server start");
});
