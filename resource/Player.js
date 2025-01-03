class Player {
  #id; //プレイヤーの識別子
  #name;
  #age;
  #score;
  #state = stateType.findingOpponent; //プレイヤーの状態
  #opponent = null; //対戦相手
  #lastOpponent = null; //直前の対戦相手
  #log = [];

  constructor(id = -1, name = "Noah", age = 12, initialScore = 0) {
    this.#id = parseInt(id, 10); //識別子は整数
    this.#name = String(name); //名前は文字列
    this.#age = Math.max(parseInt(age, 10), 0); //年齢は自然数
    this.#score = parseFloat(initialScore, 10); //スコアは実数
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
    if (this.state !== this.stateType.findingOpponent) {
      throw new Error("This player is not finding an opponent");
    }

    //active または waiting 状態にする
    if (
      nextStateType === this.stateType.active ||
      nextStateType === this.stateType.waiting
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

    //対戦相手と同じ状態にしてはいけない (片方が active で片方が waiting)
    if (this.state === opponent.state) {
      throw new Error("This player and the opponent are in the same state");
    }

    this.#pushLog(
      `Matching was completed successfully (Opponent: id=${opponent.id}, name=${opponent.name}, age=${opponent.age})`
    );
  }

  activate() {
    //waiting 状態でなければエラー
    if (this.state !== this.stateType.waiting) {
      throw new Error("This player is not waiting");
    }

    //active 状態にする
    this.#setState(this.stateType.active);
  }

  deactivate() {
    //active 状態でなければエラー
    if (this.state !== this.stateType.active) {
      throw new Error("This player is not active");
    }

    //waiting 状態にする
    this.#setState(this.stateType.waiting);
  }

  dematch(givenScore = 0) {
    //active または waiting 状態でなければエラー
    if (
      this.state !== this.stateType.active &&
      this.state !== this.stateType.waiting
    ) {
      throw new Error("This player is not matching");
    }

    //スコアを加算する
    this.#score += parseFloat(givenScore, 10);

    //free 状態にする
    this.#setState(this.stateType.free);

    //対戦相手の設定を消す
    this.#lastOpponent = this.opponent;
    this.#opponent = null;

    this.#pushLog("Matching has been over");
  }

  restartFindingOpponent() {
    //free 状態でなければエラー
    if (this.state !== this.stateType.free) {
      throw new Error("This player is not free");
    }

    //findingOpponent 状態にする
    this.#setState(this.stateType.findingOpponent);
  }

  exit() {
    //findingOpponent または free 状態でなければエラー
    if (
      this.state !== this.stateType.findingOpponent &&
      this.state !== this.stateType.free
    ) {
      throw new Error("This player is not in a state to exit");
    }

    //exited 状態にする
    this.#setState(this.stateType.exited);
  }

  exitAnyway() {
    if (
      this.state === this.stateType.active ||
      this.state === this.stateType.waiting
    ) {
      //対戦中の場合はマッチングを解消して退出する
      this.player.dematch();
      this.player.exit();

      //対戦相手もマッチングを解消する
      //退出者(このプレイヤー)のスコアは対戦相手に引き継ぐ
      const score = this.score + 1;
      this.lastOpponent.dematch(score);
    } else if (
      this.state === this.stateType.findingOpponent ||
      this.state === this.stateType.free
    ) {
      //退出する
      this.player.exit();
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