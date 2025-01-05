import Player from "./Player.js";
class PlayerMatchingMaker {
  #players;
  #nextId;
  #lock; // 排他制御用フラグ
  #intervalId; // setInterval の識別子

  constructor(interval_ms = 5000) {
    this.init(interval_ms);
  }

  init(interval_ms) {
    this.#players = [];
    this.#nextId = 0;
    this.#lock = false;
    this.#intervalId = null;
    this.stopInterval();
    this.startInterval(interval_ms);
  }

  async addPlayer(player) {
    // 排他制御で安全にプレイヤーを追加する
    await this.#acquireLock();

    try {
      this.#players.push(player);
      ++this.#nextId;
    } finally {
      this.#releaseLock();
    }
  }

  addPlayerByInfo(info) {
    //必要なキーが無ければエラー
    if (!("name" in info) || !("age" in info)) {
      throw new Error('The keys "name" or "age" were not given');
    }

    //プレイヤーを作成して追加する
    const player = new Player(this.#nextId, info.name, info.age);
    this.addPlayer(player);

    return player;
  }

  async makeMatching() {
    // 排他制御で安全にマッチングを実行する
    await this.#acquireLock();

    this.#players = this.#players.filter(
      (player) => player.state === Player.stateType.findingOpponent
    );

    const pairs = [];
    try {
      while (this.#players.length >= 2) {
        pairs.push([this.#players.shift(), this.#players.shift()]);
      }
    } finally {
      this.#releaseLock();
    }

    pairs.forEach((pair) => {
      const firstPlayer = pair[0];
      const secondPlayer = pair[1];

      firstPlayer.match(Player.stateType.active, secondPlayer);
      secondPlayer.match(Player.stateType.waiting, firstPlayer);
    });
  }

  #acquireLock(interval_ms = 10) {
    // 排他制御用のロックをする
    return new Promise((resolve) => {
      const check = () => {
        if (!this.#lock) {
          //ロックがかかっていなければ、ロックして Promise を解決する
          this.#lock = true;
          resolve();
        } else {
          //既にロックがかかっていれば、待機して check を再試行する
          setTimeout(check, interval_ms);
        }
      };

      // check を再帰実行する
      check();
    });
  }

  #releaseLock() {
    // ロックを解除する
    this.#lock = false;
  }

  startInterval(interval_ms) {
    if (this.#intervalId !== null) {
      return;
    }

    // 定期的に makeMatching を実行する
    this.#intervalId = setInterval(() => {
      this.makeMatching().catch((error) => {
        console.error("Error in makeMatching: ", error);
      });
    }, interval_ms);
  }

  stopInterval() {
    if (this.#intervalId === null) {
      return;
    }

    //設定した定期実行を停止する
    clearInterval(this.#intervalId);
    this.#intervalId = null;
  }
}

export default PlayerMatchingMaker;
