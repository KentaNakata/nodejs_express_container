import express_test from "./express_test.js";
import Player from "./Player.js";
import PlayerMatchingMaker from "./PlayerMatchingMaker.js";

import http from "http";
import { WebSocketServer as WSServer } from "ws";

//サーバーの起動
const exs = http.createServer(express_test);
exs.listen(8000, () => {
  console.log("HTTP Express server is opening");
  console.log("Port: " + exs.address().port);
});
const wss = new WSServer({ server: exs });

let pmm = null;

//サーバー起動時の処理
wss.on("listening", () => {
  console.log("WebSocket server is opening");
  pmm = new PlayerMatchingMaker();
});

//サーバーにクライアントが接続したときの処理
wss.on("connection", async (ws) => {
  console.log("A new player connected to WebSocket server");
  ws.send("Please send your name and age");

  let player = null;

  // プレイヤー情報の待機・受信
  await new Promise((resolve) => {
    ws.on("message", (info) => {
      // プレイヤーの登録
      const parsedInfo = JSON.parse(info.toString());
      player = pmm.addPlayerByInfo(parsedInfo);

      console.log(
        `A player sent the information (name=${player.name}, age=${player.age})`
      );
      ws.send(
        `Thank you for your information (You: name=${player.name}, age=${player.age})`
      );

      // 待機を終了して処理を続行
      resolve();
    });
  });

  //切断時の処理
  ws.on("close", () => {
    console.log("A player disconnected");
    player.exitAnyway();
  });

  while (true) {
    //マッチング
    while (true) {
      ws.send("We are finding your opponent...");

      //待機
      const checkInterval_ms = 5000;
      await new Promise((resolve) => setTimeout(resolve, checkInterval_ms));

      //退出確認
      if (player.state === Player.stateType.exited) {
        return;
      }

      //マッチング成立の確認
      if (
        player.state === Player.stateType.active ||
        player.state === Player.stateType.waiting
      ) {
        break;
      }

      //接続確認
      ws.ping();
    }

    ws.send(
      `We found your opponent (Your opponent: name=${player.opponent.name}, age=${player.opponent.age})`
    );
    ws.send(`Your current state: ${player.state}`);

    //対戦
    while (true) {
      //処理
      //

      //待機
      const checkInterval_ms = 5000;
      await new Promise((resolve) => setTimeout(resolve, checkInterval_ms));

      //退出確認
      if (player.state === Player.stateType.exited) {
        return;
      }

      //対戦終了の確認
      if (player.state === Player.stateType.free) {
        break;
      }
    }

    ws.send(`The battle finished (Score: ${player.score})`);

    //再戦
    player.restartFindingOpponent();
    pmm.addPlayer(player);
  }
});

//サーバーエラー時の処理
wss.on("error", (err) => {
  console.log("WebSocket server error: ", err);
});

//サーバー終了時の処理
wss.on("close", () => {
  console.log("WebSocket server is closing");
});

//クライアント用UI
express_test.get("/play", (req, res, next) => {
  res.render("title");
});

//クライアント用UI
express_test.get("/play2", (req, res, next) => {
  res.sendFile("/usr/src/app/game/matching/index.html");
});
