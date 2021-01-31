const express = require("express");
require("dotenv").config();
const app = express();

// creation d un server http
const server = require("http").Server(app);

// import socket io pour la communication en temps reel entre serveur et client
const io = require("socket.io")(server);
const { ExpressPeerServer } = require("peer");
// generer des id unique
const { v4: uuid } = require("uuid");
const peerServer = ExpressPeerServer(server, {
  debug: true,
});

const PORT = process.env.PORT;

// utilisation de  moteur de fichier ejs
app.set("view engine", "ejs");

app.use("/peerjs", peerServer);
// utilisation de fichier static
app.use(express.static("public"));

app.get("/:room", (req, res) => {
  const id = req.params.room;
  res.status(200).render("room", { roomId: id });
});

app.get("/", (req, res) => {
  res.redirect(`/${uuid()}`);
  // res.status(200).render("flux");
});

io.on("connection", (socket) => {
  socket.on("join-room", (roomId, userId) => {
    socket.join(roomId);
    socket.to(roomId).broadcast.emit("user-connected", userId);
  });
});

server.listen(PORT, () => {
  console.log("server start");
});
