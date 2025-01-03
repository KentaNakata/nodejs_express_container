import express_base from "./express_base.js";

//Hello World
express_base.get("/", (req, res, next) => {
  console.log("/ is called");
  res.status(200).send("Hello World");
});

//GETのテスト
express_base.get("/test", async function (req, res, next) {
  console.log("/test is called; GET request: " + JSON.stringify(req.query));
  const note = req.query.note || "none";
  res.send(
    `<p>test</p>
    <p>GET request: note=${note}</p>` + JSON.stringify(req.query)
  );
});

//POSTのテスト
express_base.post("/test", async function (req, res, next) {
  console.log("/test is called; POST request: " + JSON.stringify(req.body));
  const name = req.body.name || "none";
  const age = req.body.age || "none";
  res.send(
    `<p>test</p>
    <p>POST request: name=${name}, age=${age}</p>` + JSON.stringify(req.body)
  );
});

//リダイレクトのテスト
express_base.get("/test/redirect_tmp", async function (req, res, next) {
  res.redirect("/test?note=hello"); //デフォルトはstatus=302
});

//リダイレクトのテスト
express_base.get("/test/redirect", async function (req, res, next) {
  res.redirect(301, "/test?note=hello"); //status=301を指定
});

//POSTリクエストのテスト
express_base.get("/test/request", async function (req, res, next) {
  res.send(`
    <!DOCTYPE html>
    <html>
    <head>
        <title>POST Request Form</title>
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
express_base.get("/test/render", async function (req, res, next) {
  const note = req.query.note || "none";
  res.render("test/render", { note: note });
});

//jsonレスポンスのテスト
express_base.get("/test/json", (req, res, next) => {
  const note = req.query.note || "none";
  const data = {
    title: "test",
    note: note,
  };
  res.json(data);
});

export default express_base;
