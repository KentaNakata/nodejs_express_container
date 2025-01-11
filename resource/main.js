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
  function wsSend(data) {
    ws.send(JSON.stringify(data));
  }

  console.log("A new player connected to WebSocket server");
  wsSend({ message: "Please send your name and age" });

  let player = null;

  // プレイヤー情報の待機・受信
  await new Promise((resolve) => {
    ws.on("message", (data) => {
      const parsedData = JSON.parse(data.toString());

      if (!("name" in parsedData) || !("age" in parsedData)) {
        //必要なキーが無ければそれを通知
        console.log('Warn: The keys "name" or "age" were not given');
        wsSend({ message: 'Warn: The keys "name" or "age" were not given' });

        return;
      }

      // プレイヤーの登録
      player = pmm.addPlayerByInfo(parsedData.name, parsedData.age);

      console.log(
        `A player sent the information (name=${player.name}, age=${player.age})`
      );
      wsSend({ message: "Thank you for your information" });
      wsSend({
        message: `(You: name=${player.name}, age=${player.age}, score=${player.score})`,
        score: player.score,
        state: player.state,
      });

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
    //受信時の処理の変更
    ws.removeAllListeners("message");
    ws.on("message", (data) => {
      wsSend({
        message: "Warn: Your message was discarded",
        state: player.state,
      });
    });

    //マッチング
    while (true) {
      wsSend({
        message: "We are finding your opponent...",
        state: player.state,
      });

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

    wsSend({ message: "We found your opponent" });
    wsSend({
      message: `(Your opponent: name=${player.opponent.name}, age=${player.opponent.age})`,
      opponentName: player.opponent.name,
      opponentAge: player.opponent.age,
    });
    wsSend({
      message: `Your current state: ${player.state}`,
      state: player.state,
    });

    //受信時の処理の変更
    ws.removeAllListeners("message");
    ws.on("message", (data) => {
      // プレイヤーの現在情報の受信
      const parsedData = JSON.parse(data.toString());

      if (!("X" in parsedData) || !("Y" in parsedData)) {
        //必要なキーが無ければそれを通知
        console.log('Warn: The keys "X" or "Y" were not given');
        wsSend({
          message: 'Warn: The keys "X" or "Y" were not given',
        });

        return;
      }

      player.setXY(parsedData.X, parsedData.Y);

      //対戦相手が退出している可能性があるため存在の確認
      if (player.opponent) {
        //現在情報の送信
        wsSend({
          state: player.state,
          opponentX: player.opponent.X,
          opponentY: player.opponent.Y,
        });
      } else {
        //現在情報の送信
        wsSend({
          state: player.state,
        });
      }
    });

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

    wsSend({
      message: `The battle finished (Score: ${player.score})`,
      score: player.score,
      state: player.state,
    });

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
