import express from "express";

const app = express();

//expressの設定
app.use(express.urlencoded({ extended: true })); //bodyでやり取りするデータをObject形式にする
app.use("/game/1/", express.static("/usr/src/app/game/1")); //URLでファイルに直接アクセスできるようにする
app.set("views", "./views");
app.set("view engine", "ejs");

export default app;
