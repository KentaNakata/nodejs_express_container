/*:
 * @target MZ
 * @plugindesc WebSocket通信関連の処理
 * @author Nakaken
 *
 *
 *
 * @param receive
 * @text ■ 受信設定
 *
 * @param scoreVarId
 * @text スコア受信時に内容が格納される変数ID
 * @type number
 * @parent receive
 * @default 0
 *
 * @param stateVarId
 * @text 状態受信時に内容が格納される変数ID
 * @type number
 * @parent receive
 * @default 0
 *
 * @param opponentNameVarId
 * @text 対戦相手の名前受信時に内容が格納される変数ID
 * @type number
 * @parent receive
 * @default 0
 *
 * @param opponentAgeVarId
 * @text 対戦相手の年齢受信時に内容が格納される変数ID
 * @type number
 * @parent receive
 * @default 0
 *
 * @param messageVarId
 * @text メッセージ受信時に内容が格納される変数ID
 * @type number
 * @parent receive
 * @default 0
 *
 * @param messageCommonEventId
 * @text メッセージ受信時に実行されるコモンイベントID
 * @type number
 * @parent receive
 * @default 0
 *
 * @param releaseLockTime
 * @text 1つのメッセージ受信時に実行されるコモンイベントのロック時間[ms]
 * @type number
 * @parent receive
 * @default 3000
 *
 * @param opponentEventName
 * @text 対戦相手のイベント名
 * @type string
 * @parent receive
 * @default 対戦相手
 *
 * @param opponentEnabledSwitchId
 * @text 対戦相手が有効かどうかが格納されるスイッチID
 * @type number
 * @parent receive
 * @default 0
 *
 *
 *
 * @command connect
 * @text 接続
 *
 *
 *
 * @command send
 * @text 送信
 *
 * @arg message
 * @text メッセージ
 * @type string
 *
 * @arg name
 * @text 名前
 * @type string
 *
 * @arg age
 * @text 年齢
 * @type string
 *
 *
 *
 * @command close
 * @text 切断
 *
 */

(() => {
  const pluginName = "_socket";
  const parameters = PluginManager.parameters(pluginName);
  const scoreVarId = parameters["scoreVarId"];
  const stateVarId = parameters["stateVarId"];
  const opponentNameVarId = parameters["opponentNameVarId"];
  const opponentAgeVarId = parameters["opponentAgeVarId"];
  const messageVarId = parameters["messageVarId"];
  const messageCommonEventId = parameters["messageCommonEventId"];
  const releaseLockTime = parameters["releaseLockTime"];
  const opponentEventName = parameters["opponentEventName"];
  const opponentEnabledSwitchId = parameters["opponentEnabledSwitchId"];

  let socket = null;
  let lock = false;
  let intervalId = null;

  let name = null; //TODO 構造化
  let age = null;
  let score = null;
  let state = null;
  let opponentName = null;
  let opponentAge = null;
  let opponentX = null;
  let opponentY = null;

  //変数リセット
  function resetVars() {
    name = null;
    age = null;
    score = null;
    state = null;
    opponentName = null;
    opponentAge = null;
    opponentX = null;
    opponentY = null;
  }

  PluginManager.registerCommand(pluginName, "connect", (args) => {
    resetVars();
    stopInterval();

    // WebSocketの接続
    socket = new WebSocket("ws://localhost:8080");

    // 接続時の処理
    socket.onopen = () => {
      receiveMessage("Connected to WebSocket server");
    };

    // 受信時の処理
    socket.onmessage = (event) => {
      const parsedData = JSON.parse(event.data);

      if ("message" in parsedData) {
        receiveMessage("[Server]: " + String(parsedData.message));
      }
      if ("score" in parsedData) {
        score = parseInt(parsedData.score, 10);
        if (scoreVarId >= 1) $gameVariables.setValue(scoreVarId, score);
      }
      if ("state" in parsedData) {
        state = String(parsedData.state);
        if (stateVarId >= 1) $gameVariables.setValue(stateVarId, state);
        if (state === "active" || state === "waiting") {
          startInterval();
        } else {
          stopInterval();
          opponentName = null;
          opponentAge = null;
          opponentX = null;
          opponentY = null;
        }
      }
      if ("opponentName" in parsedData) {
        opponentName = String(parsedData.opponentName);
        if (opponentNameVarId >= 1)
          $gameVariables.setValue(opponentNameVarId, opponentName);
      }
      if ("opponentAge" in parsedData) {
        opponentAge = parseInt(parsedData.opponentAge, 10);
        if (opponentAgeVarId >= 1)
          $gameVariables.setValue(opponentAgeVarId, opponentAge);
      }
      if ("opponentX" in parsedData) {
        opponentX = parseInt(parsedData.opponentX, 10);
      }
      if ("opponentY" in parsedData) {
        opponentY = parseInt(parsedData.opponentY, 10);
      }

      if (!opponentEventName) {
        return;
      }

      const opponentEvent = $gameMap
        .events()
        .find((event) => event && event.name === opponentEventName);

      if (!opponentEvent) {
        return;
      }

      function isNullOrNaN(value) {
        return value === null || isNaN(value); //isNaN(null) = isNaN(0) = false であることに注意
      }

      if (isNullOrNaN(opponentX) || isNullOrNaN(opponentY)) {
        if (opponentEnabledSwitchId >= 1)
          $gameSwitches.setValue(opponentEnabledSwitchId, false);
        //opponentEvent.erase();
      } else {
        if (opponentEnabledSwitchId >= 1)
          $gameSwitches.setValue(opponentEnabledSwitchId, true);
        //opponentEvent.refresh();
        moveEvent(opponentEvent, opponentX, opponentY);
      }
    };

    // エラー時の処理
    socket.onerror = (error) => {
      receiveMessage("WebSocket Error: ", error);
    };

    // 切断時の処理
    socket.onclose = () => {
      receiveMessage("WebSocket connection closed");
    };

    //イベントの移動
    function moveEvent(targetEvent, targetX, targetY) {
      // 移動ルートを設定
      if (targetEvent) {
        const route = {
          list: [],
          repeat: false,
          skippable: true,
          wait: false,
        };

        // 現在位置と目標位置の差分を計算
        const dx = targetX - targetEvent.x;
        const dy = targetY - targetEvent.y;

        // X方向に移動
        if (dx > 0) {
          for (let i = 0; i < dx; i++) {
            route.list.push({ code: Game_Character.ROUTE_MOVE_RIGHT });
          }
        } else if (dx < 0) {
          for (let i = 0; i < -dx; i++) {
            route.list.push({ code: Game_Character.ROUTE_MOVE_LEFT });
          }
        }

        // Y方向に移動
        if (dy > 0) {
          for (let i = 0; i < dy; i++) {
            route.list.push({ code: Game_Character.ROUTE_MOVE_DOWN });
          }
        } else if (dy < 0) {
          for (let i = 0; i < -dy; i++) {
            route.list.push({ code: Game_Character.ROUTE_MOVE_UP });
          }
        }

        // 移動ルートの終端を指定
        route.list.push({ code: 0 });

        // 移動ルートを設定
        targetEvent.forceMoveRoute(route);
      }
    }

    // メッセージの表示
    async function receiveMessage(message) {
      //$gameMessage.add(message);

      //PluginManager.callCommand(this, "LL_InfoPopupWIndow", "showMessage", {
      //  messageText: message,
      //}); //第1引数がthisではダメ

      await acquireLock();

      if (messageVarId >= 1) $gameVariables.setValue(messageVarId, message);
      if (messageCommonEventId >= 1)
        $gameTemp.reserveCommonEvent(messageCommonEventId);

      if (releaseLockTime >= 1) setTimeout(releaseLock, releaseLockTime);
    }

    // ロック
    function acquireLock(interval_ms = 100) {
      return new Promise((resolve) => {
        const check = () => {
          if (!lock) {
            lock = true;
            resolve();
          } else {
            setTimeout(check, interval_ms);
          }
        };

        check();
      });
    }

    // ロック解除
    function releaseLock() {
      lock = false;
    }
  });

  // 自分の情報の設定
  function setInfo(args) {
    //制御文字の展開
    name = new Window_Base(new Rectangle(0, 0, 0, 0)).convertEscapeCharacters(
      args.name || ""
    );
    const ageStr = new Window_Base(
      new Rectangle(0, 0, 0, 0)
    ).convertEscapeCharacters(args.age || "");
    age = Math.max(parseInt(ageStr, 10), 0);
  }

  PluginManager.registerCommand(pluginName, "send", (args) => {
    if (!socket) {
      return;
    }

    setInfo(args);

    //制御文字の展開
    const message = new Window_Base(
      new Rectangle(0, 0, 0, 0)
    ).convertEscapeCharacters(args.message || "");

    const data = {
      message: message,
      name: name,
      age: age,
    };

    // データの送信
    socket.send(JSON.stringify(data));
  });

  // 定期送信の開始
  function startInterval(interval_ms = 2000) {
    if (intervalId !== null) {
      return;
    }
    intervalId = setInterval(() => {
      const data = {
        X: $gamePlayer.x,
        Y: $gamePlayer.y,
      };

      // データの送信
      socket.send(JSON.stringify(data));
    }, interval_ms);
  }

  // 定期送信の停止
  function stopInterval() {
    if (intervalId === null) {
      return;
    }
    clearInterval(intervalId);
    intervalId = null;
  }

  function close() {
    resetVars();
    stopInterval();

    // 切断
    if (socket) {
      socket.close();
    }
  }

  PluginManager.registerCommand(pluginName, "close", (args) => {
    close();
  });
})();
