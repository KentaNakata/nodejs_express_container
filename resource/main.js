//モジュールの要求
const express = require("express");
const app = express();

app.use(express.urlencoded({ extended: true }));
app.set("views", "./views");
app.set("view engine", "ejs");

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
  res.send(
    `<p>test</p>
    <p>GET request: note=${note}</p>` + JSON.stringify(req.query)
  );
});

//POSTのテスト
app.post("/test", async function (req, res, next) {
  console.log("/test is called; POST request: " + JSON.stringify(req.body));
  const name = req.body.name || "none";
  const age = req.body.age || "none";
  res.send(
    `<p>test</p>
    <p>POST request: name=${name}, age=${age}</p>` + JSON.stringify(req.body)
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
app.get("/test/render", async function (req, res, next) {
  const note = req.query.note || "none";
  res.render("test/render.ejs", { note: note });
});

//jsonレスポンスのテスト
app.get("/test/json", (req, res) => {
  const note = req.query.note || "none";
  const data = {
    title: "test",
    note: note,
  };
  res.json(data);
});
