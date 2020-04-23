const express = require("express");
const app = express();
const server = require("http").createServer(app);
const io = require("socket.io")(server);
const port = process.env.PORT || 8000;

io.on("connection", (socket) => {
  console.log("user connected");

  socket.on("newMessage", (data) => {
    console.log(data);

    io.sockets.emit("newMessage", data);
  });
});

app.use("/", (req, res) => {
  res.send("Hola Mundo");
});

server.listen(port, () => {
  console.log(`Servidor escuchando en el puerto http://localhost:${port}`);
});
