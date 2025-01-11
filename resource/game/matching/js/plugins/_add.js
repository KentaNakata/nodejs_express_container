//=============================================================================
// RPG Maker MZ - Alternative Save Screen
//=============================================================================

/*:
 * @target MZ
 * @plugindesc additional js script.
 * @author Nakaken
 *
 * @command connect
 * @text 接続
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
 */

(() => {
  const pluginName = "_add";
  let socket;
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

  PluginManager.registerCommand(pluginName, "connect", (args) => {
    // WebSocketの接続
    socket = new WebSocket("ws://localhost:8080");

    // 接続時の処理
    socket.onopen = () => {
      displayMessage("Connected to WebSocket server");
    };

    // 受信時の処理
    socket.onmessage = (event) => {
      const parsedData = JSON.parse(event.data);

      if ("message" in parsedData) {
        displayMessage("[Server]: " + String(parsedData.message));
      }
      if ("score" in parsedData) {
        score = parseInt(parsedData.score, 10);
        const varID = 113;
        $gameVariables.setValue(varID, score);
      }
      if ("state" in parsedData) {
        state = String(parsedData.state);
        const varID = 114;
        $gameVariables.setValue(varID, state);
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
        const varID = 115;
        $gameVariables.setValue(varID, opponentName);
      }
      if ("opponentAge" in parsedData) {
        opponentAge = parseInt(parsedData.opponentAge, 10);
        const varID = 116;
        $gameVariables.setValue(varID, opponentAge);
      }
      if ("opponentX" in parsedData) {
        opponentX = parseInt(parsedData.opponentX, 10);
      }
      if ("opponentY" in parsedData) {
        opponentY = parseInt(parsedData.opponentY, 10);
      }

      const eventID = 27;
      const opponentEvent = $gameMap.event(eventID);

      function isNullOrNaN(value) {
        return value === null || isNaN(value); //isNaN(null) = isNaN(0) = false であることに注意
      }

      const switchID = 39;
      if (isNullOrNaN(opponentX) || isNullOrNaN(opponentY)) {
        $gameSwitches.setValue(switchID, false);
        //opponentEvent.erase();
      } else {
        $gameSwitches.setValue(switchID, true);
        //opponentEvent.refresh();
        moveEvent(opponentEvent, opponentX, opponentY);
      }
    };

    // エラー時の処理
    socket.onerror = (error) => {
      displayMessage("WebSocket Error: ", error);
    };

    // 切断時の処理
    socket.onclose = () => {
      displayMessage("WebSocket connection closed");
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
    async function displayMessage(message) {
      //$gameMessage.add(message);

      //PluginManager.callCommand(this, "LL_InfoPopupWIndow", "showMessage", {
      //  messageText: message,
      //}); //第1引数がthisではダメ

      await acquireLock();

      const varID = 117;
      const commonEventID = 398;
      $gameVariables.setValue(varID, message);
      $gameTemp.reserveCommonEvent(commonEventID); //messageをポップアップ表示

      const releaseLockTime = 3000;
      setTimeout(releaseLock, releaseLockTime);
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

  function stopInterval() {
    if (intervalId === null) {
      return;
    }
    clearInterval(intervalId);
    intervalId = null;
  }
})();
