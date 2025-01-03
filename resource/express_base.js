import express from "express";
const app = express();

//expressの設定
app.use(express.urlencoded({ extended: true }));
app.set("views", "./views");
app.set("view engine", "ejs");

export default app;
