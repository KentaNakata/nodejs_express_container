import app from "./express_test.js";
import http from "http";
import { WebSocketServer } from "ws";

//サーバーの起動
const server = http.createServer(app);
server.listen(8000, () => {
  console.log("server started");
  console.log("port:" + server.address().port);
});
const wss = new WebSocketServer({ server });

wss.on("connection", (ws) => {
  console.log("Client connected");

  ws.send("Hello, Client!");

  ws.on("message", (message) => {
    console.log("Message from client: ", message);
  });
});

app.get("/ws", (req, res, next) => {
  res.send(`<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>WebSocket Client</title>
</head>
<body>
  <h1>WebSocket Test</h1>
  <script>
    const socket = new WebSocket("ws://localhost:8080");

    socket.onopen = () => {
      console.log("Connected to WebSocket server");
      socket.send("Hello, Server!");
    };

    socket.onmessage = (event) => {
      console.log("Message from server: ", event.data);
    };

    socket.onerror = (error) => {
      console.log("WebSocket Error: ", error);
    };

    socket.onclose = () => {
      console.log("WebSocket connection closed");
    };
  </script>
</body>
</html>
`);
});
