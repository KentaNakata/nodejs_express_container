const express = require("express");
const app = express();

const server = app.listen(8000, function () {
  console.log("server started");
  console.log("port:" + server.address().port);
});

app.get("/", (req, res) => {
  console.log("/ is called");
  res.status(200).send("Hello World");
});

app.get("/test", async function (req, res, next) {
  console.log("/test is called");
  res.send("test");
});

app.get("/test/json", (req, res) => {
  console.log("/test/json is called");
  const data = {
    message: "test",
  };
  res.json(data);
});
