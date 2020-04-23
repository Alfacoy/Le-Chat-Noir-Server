const express = require("express");
const app = express();
const server = require("http").createServer(app);
const io = require("socket.io")(server);
const port = process.env.PORT || 3000;

let users_connected = 0;

//Socket IO
io.on("connection", (socket) => {
  users_connected += 1;

  socket.on("disconnect", () => {
    users_connected -= 1;
  });

  socket.on("newMessage", (data) => {
    io.sockets.emit("newMessage", data);
  });

  socket.emit("usersConnected", users_connected);
});

//Express
app.use("/", (req, res) => {
  res.send("Un simple server :( no me odies.");
});

server.listen(port, () => {
  console.log(`Servidor escuchando en el puerto http://localhost:${port}`);
});
