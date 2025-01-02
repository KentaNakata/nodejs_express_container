//モジュールの要求
const express = require("express");
const app = express();

app.use(express.urlencoded({ extended: true }));

//サーバーの起動
const server = app.listen(8000, function () {
  console.log("server started");
  console.log("port:" + server.address().port);
});

//Hello World
app.get("/", (req, res) => {
  console.log("/ is called");
  res.status(200).send("Hello World");
});

//GETのテスト
app.get("/test", async function (req, res, next) {
  console.log("/test is called; GET request: " + JSON.stringify(req.query));
  const note = req.query.note || "none";
  res.send(`test; GET request: note=${note}, ` + JSON.stringify(req.query));
});

//POSTのテスト
app.post("/test", async function (req, res, next) {
  console.log("/test is called; POST request: " + JSON.stringify(req.body));
  const name = req.body.name || "none";
  const age = req.body.age || "none";
  res.send(
    `test; POST request: name=${name}, age=${age}, ` + JSON.stringify(req.body)
  );
});

//リダイレクトのテスト
app.get("/test/redirect_tmp", async function (req, res, next) {
  res.redirect("/test?note=hello"); //デフォルトはstatus=302
});

//リダイレクトのテスト
app.get("/test/redirect", async function (req, res, next) {
  res.redirect(301, "/test?note=hello"); //status=301を指定
});

//POSTリクエストのテスト
app.get("/test/request", async function (req, res, next) {
  res.send(`
    <!DOCTYPE html>
    <html>
    <head>
        <title>Form Example</title>
    </head>
    <body>
        <form action="/test" method="post">
            <input type="text" name="name" placeholder="name">
            <input type="text" name="age" placeholder="age">
            <input type="submit" value="submit">
        </form>
    </body>
    </html>
  `);
});

//レンダリングのテスト
app.get("/test/res", async function (req, res, next) {
  res.send("test; GET request: note=<%= note %>");
});

//jsonレスポンスのテスト
app.get("/test/json", (req, res) => {
  console.log("/test/json is called");
  const data = {
    message: "test",
  };
  res.json(data);
});
