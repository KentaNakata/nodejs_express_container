class Player {
  #id; //プレイヤーの識別子
  #name;
  #age;
  #score;
  #state = Player.stateType.findingOpponent; //プレイヤーの状態
  #opponent = null; //対戦相手
  #lastOpponent = null; //直前の対戦相手
  #log = [];

  constructor(id = -1, name = "Noah", age = 12, initialScore = 0) {
    this.#id = parseInt(id, 10); //識別子は整数
    this.#name = String(name); //名前は文字列
    this.#age = Math.max(parseInt(age, 10), 0); //年齢は自然数
    this.#score = parseInt(initialScore, 10); //スコアは整数
  }

  get id() {
    return this.#id;
  }
  get name() {
    return this.#name;
  }
  get age() {
    return this.#age;
  }
  get score() {
    return this.#score;
  }
  get state() {
    return this.#state;
  }
  get opponent() {
    return this.#opponent;
  }
  get lastOpponent() {
    return this.#lastOpponent;
  }
  get log() {
    return this.#log;
  }

  #setState(state) {
    this.#state = state;
    this.#pushLog(`The state is now ${state}`);
  }

  #pushLog(message) {
    const playerInfo = `[Player: id=${this.id}, name=${this.name}, age=${this.age}] `;
    console.log(playerInfo + message);
    this.log.push(message);
  }

  match(nextStateType, opponent) {
    //findingOpponent 状態でなければエラー
    if (this.state !== Player.stateType.findingOpponent) {
      throw new Error("This player is not finding an opponent");
    }

    //active または waiting 状態にする
    if (
      nextStateType === Player.stateType.active ||
      nextStateType === Player.stateType.waiting
    ) {
      this.#setState(nextStateType);
    } else {
      throw new Error("The given stateType is invalid");
    }

    //対戦相手を設定する
    if (opponent != null) {
      this.#opponent = opponent;
    } else {
      throw new Error("The given opponent is invalid");
    }

    //対戦相手と同じ状態にしてはいけない (先攻が active で後攻が waiting)
    if (this.state === opponent.state) {
      throw new Error("This player and the opponent are in the same state");
    }

    this.#pushLog(
      `Matching was completed successfully (Opponent: id=${opponent.id}, name=${opponent.name}, age=${opponent.age})`
    );
  }

  activate() {
    //waiting 状態でなければエラー
    if (this.state !== Player.stateType.waiting) {
      throw new Error("This player is not waiting");
    }

    //active 状態にする
    this.#setState(Player.stateType.active);
  }

  deactivate() {
    //active 状態でなければエラー
    if (this.state !== Player.stateType.active) {
      throw new Error("This player is not active");
    }

    //waiting 状態にする
    this.#setState(Player.stateType.waiting);
  }

  dematch(givenScore = 0) {
    //active または waiting 状態でなければエラー
    if (
      this.state !== Player.stateType.active &&
      this.state !== Player.stateType.waiting
    ) {
      throw new Error("This player is not currently matched with anyone");
    }

    //スコアを加算する
    this.#score += parseInt(givenScore, 10);

    //free 状態にする
    this.#setState(Player.stateType.free);

    //対戦相手の設定を消す
    this.#lastOpponent = this.opponent;
    this.#opponent = null;

    this.#pushLog(`Matching has ended (Score: ${this.#score})`);
  }

  restartFindingOpponent() {
    //free 状態でなければエラー
    if (this.state !== Player.stateType.free) {
      throw new Error("This player is not free");
    }

    //findingOpponent 状態にする
    this.#setState(Player.stateType.findingOpponent);
  }

  exit() {
    //findingOpponent または free 状態でなければエラー
    if (
      this.state !== Player.stateType.findingOpponent &&
      this.state !== Player.stateType.free
    ) {
      throw new Error("This player cannot exit in their current state");
    }

    //exited 状態にする
    this.#setState(Player.stateType.exited);
  }

  exitAnyway() {
    if (
      this.state === Player.stateType.active ||
      this.state === Player.stateType.waiting
    ) {
      //対戦中の場合はマッチングを解消して退出する
      this.dematch();
      this.exit();

      //対戦相手もマッチングを解消する
      //退出者(このプレイヤー)のスコアは対戦相手に引き継ぐ
      const score = this.score + 1;
      this.lastOpponent.dematch(score);
    } else if (
      this.state === Player.stateType.findingOpponent ||
      this.state === Player.stateType.free
    ) {
      //退出する
      this.exit();
    }
  }

  //状態のリスト (疑似enum)
  static #stateType = Object.freeze({
    findingOpponent: "finding an opponent", //対戦相手を探している状態
    active: "active", //操作している状態
    waiting: "waiting", //対戦相手の操作を待っている状態
    free: "free", //何もしていない状態
    exited: "exited", //既に退出している状態
  });

  static get stateType() {
    return this.#stateType;
  }
}

export default Player;
