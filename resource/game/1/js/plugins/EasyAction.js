// EasyAction.js Ver.2.5.0
// MIT License (C) 2021 あわやまたな
// http://opensource.org/licenses/mit-license.php

/*:
* @target MZ MV
* @plugindesc ツクールDS系列の簡単アクションを再現します。
* @orderAfter PluginCommonBase
* @orderAfter EventEffects
* @author あわやまたな (Awaya_Matana)
* @url https://awaya3ji.seesaa.net/
* @help
* 【スクリプト】
* 移動ルートの設定で以下のスクリプトが使えるようになります。
* this.easySpin(引数)
* その場で一回転します。
* this.easyShake(引数)
* その場で揺れます。
*
* 引数がtrueもしくは未入力だと終わるまでウェイト。falseだとウェイトしません。
* 持続フレーム数は24フレームです。
*
* this.easyJump()
* その場でジャンプします。
* this.easyBackoff()
* その場で後退します。
* this.easyBackstep()
* 向きを変えず一歩後方にジャンプします。
* 持続フレーム数はキャラクターの移動速度によって可変します。
*
* this.easyAngle(引数)
* 角度を変更します。引数は度数法で角度を指定します。0もしくは未入力で解除。
* this.easyBlink(引数);
* 点滅させます。引数がtrueもしくは未入力でオン、falseでオフ。
* this.easyTra(引数);
* 半透明にします。引数がtrueもしくは未入力でオン、falseでオフ。
*
* 【プラグインコマンド（MV）】
* easySpin イベントID 真偽値
* その場で一回転します。
* easyShake イベントID 真偽値
* その場で揺れます。
*
* 真偽値がtrueもしくは未入力だと終わるまでウェイト。falseだとウェイトしません。
* 持続フレーム数は24フレームです。
*
* easyJump イベントID 真偽値
* その場でジャンプします。
* easyBackoff イベントID 真偽値
* その場で後退します。
* easyBackstep イベントID 真偽値
* 向きを変えず一歩後方にジャンプします。
*
* 真偽値がtrueもしくは未入力だと終わるまでウェイト。falseだとウェイトしません。
* 持続フレーム数はキャラクターの移動速度によって可変します。
*
* easyAngle イベントID 角度
* 角度を変更します。度数法で角度を指定します。0もしくは未入力で解除。
* easyBlink イベントID 真偽値
* 点滅させます。真偽値がtrueもしくは未入力でオン、falseでオフ。
* easyTra イベントID 真偽値
* 半透明にします。真偽値がtrueもしくは未入力でオン、falseでオフ。
*
*【メモ】
* イベントのメモ欄に角度をコンマ区切りで入力することでページ毎に角度の
* 初期状態を設定できます。
* 設定しない場所は0で埋めるか空欄にして下さい。
* <easyAngle:50> //1ページ目を50°にする
* <easyAngle:0,0,120> <easyAngle:,,120> //3ページ目を120°にする
* <easyAngle:50,0,120> <easyAngle:50,,120> //1ページ目を50°、3ページ目を120°にする
* <easyBlink:2> //2ページ目を点滅させる。
* <easyBlink:1,3> //1ページ目と3ページ目を点滅させる。
* <easyTra:2> //2ページ目を半透明にする。
* <easyTra:1,3> //1ページ目と3ページ目を半透明にする。
*
* [更新履歴]
* 2021/08/07：Ver.1.0.0　公開
* 2021/08/09：Ver.1.1.0　バグ修正と機能追加。
* 2021/08/10：Ver.1.1.1　ジャンプ時にフォロワーの移動を禁止。
* 2021/08/17：Ver.1.1.2　例外処理追加。
* 2021/12/08：Ver.2.0.0　「イベントの角度」を追加。
* 2021/12/22：Ver.2.1.0　イベントの角度をメモ欄で設定可能に。
* 2022/02/20：Ver.2.2.0　「点滅」を追加。角度変更時のフキダシ位置を修正。
* 2022/02/21：Ver.2.3.0　「半透明」を追加。有効時、不透明度が設定値の半分になります。
* 2022/03/06：Ver.2.3.1　EventEffects併用時、角度変更適用中にフキダシの位置がおかしくなる現象（MZのみ）を修正。
* 2022/06/18：Ver.2.4.0　「揺れる」の振幅を設定可能に。
* 2022/06/19：Ver.2.4.1　MZで「一回転」終了後に一瞬表示優先度がおかしくなる問題を修正。
* 2022/06/20：Ver.2.5.0　「点滅」の仕様を改善。茂みのタイルで「一回転」したときのグラフィックの不具合を解消。
*
* @command EasySpin
* @text 一回転
* @desc その場で一回転します。
*
* @arg eventId
* @text イベントID
* @desc イベントのIDを指定します。
* このイベント:0  主人公:-1
* @default 0
* @type number
* @min -9999
*
* @arg wait
* @text 完了までウェイト
* @desc 指定した動作がすべて終了するまで待ちます。
* @default true
* @type boolean
*
* @command EasyShake
* @text 揺れる
* @desc その場で揺れます。
*
* @arg eventId
* @text イベントID
* @desc イベントのIDを指定します。
* このイベント:0  主人公:-1
* @default 0
* @type number
* @min -9999
*
* @arg wait
* @text 完了までウェイト
* @desc 指定した動作がすべて終了するまで待ちます。
* @default true
* @type boolean
*
* @command EasyJump
* @text ジャンプ
* @desc その場でジャンプします。
*
* @arg eventId
* @text イベントID
* @desc イベントのIDを指定します。
* このイベント:0  主人公:-1
* @default 0
* @type number
* @min -9999
*
* @arg wait
* @text 完了までウェイト
* @desc 指定した動作がすべて終了するまで待ちます。
* @default true
* @type boolean
*
* @command EasyBackoff
* @text 後ずさり
* @desc 一歩後退します。
*
* @arg eventId
* @text イベントID
* @desc イベントのIDを指定します。
* このイベント:0  主人公:-1
* @default 0
* @type number
* @min -9999
*
* @arg wait
* @text 完了までウェイト
* @desc 指定した動作がすべて終了するまで待ちます。
* @default true
* @type boolean
*
* @command EasyBackstep
* @text バックステップ
* @desc 向きを変えず一歩後方にジャンプします。
*
* @arg eventId
* @text イベントID
* @desc イベントのIDを指定します。
* このイベント:0  主人公:-1
* @default 0
* @type number
* @min -9999
*
* @arg wait
* @text 完了までウェイト
* @desc 指定した動作がすべて終了するまで待ちます。
* @default true
* @type boolean
*
* @command EasyAngle
* @text イベントの角度
* @desc 角度を変更します。
*
* @arg eventId
* @text イベントID
* @desc イベントのIDを指定します。
* このイベント:0  主人公:-1
* @default 0
* @type number
* @min -9999
*
* @arg angle
* @text 角度
* @desc 度数法で角度を指定します。
* @default 0
* @type number
*
* @command EasyBlink
* @text イベントの点滅
* @desc 点滅させます。
*
* @arg eventId
* @text イベントID
* @desc イベントのIDを指定します。
* このイベント:0  主人公:-1
* @default 0
* @type number
* @min -9999
*
* @arg bool
* @text 真偽値
* @desc trueで有効。falseで無効。
* @default true
* @type boolean
*
* @command EasyTra
* @text イベントの半透明
* @desc 半透明にさせます。
*
* @arg eventId
* @text イベントID
* @desc イベントのIDを指定します。
* このイベント:0  主人公:-1
* @default 0
* @type number
* @min -9999
*
* @arg bool
* @text 真偽値
* @desc trueで有効。falseで無効。
* @default true
* @type boolean
*
* @param amplitude
* @text 振幅
* @desc ［簡単アクション：揺れる］の振幅。
* @type number
* @default 4
*
*/

'use strict';
{
	//プラグイン名取得。
	const script = document.currentScript;
	const pluginName = document.currentScript.src.match(/^.*\/(.*).js$/)[1];
	
	const hasPluginCommonBase = typeof PluginManagerEx === "function";
	const useMZ = Utils.RPGMAKER_NAME === "MZ";

	const parameter = PluginManager.parameters(pluginName);
	const amplitude = Number(parameter["amplitude"]);
	
	//プラグインコマンドの定義。PluginCommonBaseの有無やMZ/MVを判別。
	if(hasPluginCommonBase && useMZ){
		PluginManagerEx.registerCommand(document.currentScript, "EasySpin", function (args) {
			this.character(args.eventId).easySpin(false);
			if(args.wait) this.wait(24);
		});
		PluginManagerEx.registerCommand(document.currentScript, "EasyAngle", function (args) {
			this.character(args.eventId).easyAngle(args.angle);
		});
		PluginManagerEx.registerCommand(document.currentScript, "EasyShake", function (args) {
			this.character(args.eventId).easyShake(false);
			if(args.wait) this.wait(24);
		});
		PluginManagerEx.registerCommand(document.currentScript, "EasyJump", function (args) {
			const character = this.character(args.eventId);
			character.easyJump(false);
			if(args.wait) this.wait(character._jumpCount);
		});
		PluginManagerEx.registerCommand(document.currentScript, "EasyBackoff", function (args) {
			const character = this.character(args.eventId);
			character.easyBackoff();
			if(args.wait) this.wait(1/character.distancePerFrame());
		});
		PluginManagerEx.registerCommand(document.currentScript, "EasyBackstep", function (args) {
			const character = this.character(args.eventId);
			character.easyBackstep();
			if(args.wait) this.wait(character._jumpCount);
		});
		PluginManagerEx.registerCommand(document.currentScript, "EasyBlink", function (args) {
			const character = this.character(args.eventId);
			character.easyBlink(args.bool);
		});
		PluginManagerEx.registerCommand(document.currentScript, "EasyTra", function (args) {
			const character = this.character(args.eventId);
			character.easyTra(args.bool);
		});
	} else if(useMZ){
		PluginManager.registerCommand(pluginName, "EasySpin", function (args) {
			const wait = args.wait==="true";
			this.character(+args.eventId).easySpin(false);
			if(wait) this.wait(24);
		});
		PluginManager.registerCommand(pluginName, "EasyAngle", function (args) {
			this.character(+args.eventId).easyAngle(+args.angle);
		});
		PluginManager.registerCommand(pluginName, "EasyShake", function (args) {
			const wait = args.wait==="true";
			this.character(+args.eventId).easyShake(false);
			if(wait) this.wait(24);
		});
		PluginManager.registerCommand(pluginName, "EasyJump", function (args) {
			const character = this.character(+args.eventId);
			const wait = args.wait==="true";
			character.easyJump(false);
			if(wait) this.wait(character._jumpCount);
		});
		PluginManager.registerCommand(pluginName, "EasyBackoff", function (args) {
			const character = this.character(+args.eventId);
			const wait = args.wait==="true";
			character.easyBackoff();
			if(wait) this.wait(1/character.distancePerFrame());
		});
		PluginManager.registerCommand(pluginName, "EasyBackstep", function (args) {
			const character = this.character(+args.eventId);
			const wait = args.wait==="true";
			character.easyBackstep();
			if(wait) this.wait(character._jumpCount);
		});
		PluginManager.registerCommand(pluginName, "EasyBlink", function (args) {
			const character = this.character(+args.eventId);
			const bool = args.bool==="true";
			character.easyBlink(bool);
		});
		PluginManager.registerCommand(pluginName, "EasyTra", function (args) {
			const character = this.character(+args.eventId);
			const bool = args.bool==="true";
			character.easyTra(bool);
		});
	}

	const commandSet1 = new Set(['easySpin', 'easyShake', 'easyJump', 'easyBackoff', 'easyBackstep']);
	const commandSet2 = new Set(['easyTra', 'easyBlink']);
	const commandSet3 = new Set(['easyAngle']);

	const _Game_Interpreter_pluginCommand = Game_Interpreter.prototype.pluginCommand;
	Game_Interpreter.prototype.pluginCommand = function(command, args) {
		_Game_Interpreter_pluginCommand.apply(this, arguments);
		
		if (commandSet1.has(command)) {
			const character = this.character(+args[0]);
			const bool = args[1]!=="false";
			character[command](false);

			if (bool) {
				switch (command) {
				case 'easySpin':
				case 'easyShake':
					this.wait(24);
					break;

				case 'easyJump':
				case 'easyBackstep':
					this.wait(character._jumpCount);
					break;
					
				case 'easyBackoff':
					this.wait(1/character.distancePerFrame());
					break;
				}
			}
		} else if (commandSet2.has(command)) {
			const character = this.character(+args[0]);
			const bool = args[1]!=="false";
			character[command](bool);
		} else if (commandSet3.has(command)) {
			const character = this.character(+args[0]);
			const angle = Number(args[1] || 0);
			character[command](angle);
		}
	};

	//簡単アクションを管理する変数を追加。
	const _Game_CharacterBase_initMembers = Game_CharacterBase.prototype.initMembers;
	Game_CharacterBase.prototype.initMembers = function() {
		_Game_CharacterBase_initMembers.call(this);
		this._easySpin = false;
		this._easySpinCount = 0;
		this._easyShake = false;
		this._easyShakeCount = 0;
		this._easyActionX = 0;
		this._easyActionAngle = 0;
		this._easyRotating  = false;
		this._easyAngle = 0;
		this._easyBlink = false;
		this._easyBlinkCount = 0;
		this._easyBlinkTra = false;
		this._easyTra = false;
	};

	const _Game_Player_initMembers = Game_Player.prototype.initMembers;
	Game_Player.prototype.initMembers = function() {
		_Game_Player_initMembers.call(this);
		this._easyActionJumping = false;
	};

	//キャラクターのアップデート処理に簡単アクションのアップデートを追加。
	const _Game_CharacterBase_update = Game_CharacterBase.prototype.update;
	Game_CharacterBase.prototype.update = function() {
		_Game_CharacterBase_update.call(this);
		this.updateEasyAngle();
		this.updateEasyShake();
		this.updateEasyBlink();
	};

	//角度を更新する
	Game_CharacterBase.prototype.updateEasyAngle = function() {
		if (this._easySpin) {
			this._easySpinCount++;
			this.easySpinSetAngle();
		}
	};

	//振動を更新する
	Game_CharacterBase.prototype.updateEasyShake = function() {
		if (this._easyShake) {
			this._easyShakeCount++;
			this.easyShakeSetOffsets();
		}
	};

	const blinkInterval = 8;
	//点滅を更新する
	Game_CharacterBase.prototype.updateEasyBlink = function() {
		if (this._easyBlink) {
			this._easyBlinkCount--;
			if (!this._easyBlinkCount) {
				this.setEasyBlinkTransparent(!this.isTransparent());
				this._easyBlinkCount = blinkInterval;
			};
		}
	};

	Game_CharacterBase.prototype.setEasyBlinkTransparent = function(transparent) {
		this._easyBlinkTra = transparent;
	};

	const _Game_CharacterBase_isTransparent = Game_CharacterBase.prototype.isTransparent;
	Game_CharacterBase.prototype.isTransparent = function() {
		return this._easyBlinkTra || _Game_CharacterBase_isTransparent.call(this);
	};

	Game_CharacterBase.prototype.easySpinSetAngle = function() {
		let angle = 15 * this._easySpinCount;
		if(angle >= 360){
			angle = 0
			this._easySpin = false;
		}
		this._easyActionAngle = angle;
	};

	Game_CharacterBase.prototype.easyShakeSetOffsets = function() {
		const angle = 37.5 * this._easyShakeCount;
		const rad = angle*Math.PI/180
		let offset = amplitude * Math.sin(rad);
		if(angle >= 900){
			this._easyShake = false;
			this._easyShakeCount = 0;
			offset = 0;
		}
		this._easyActionX = offset;
	};

	Game_CharacterBase.prototype.easySpin = function (bool = true){
		this._easySpin = true;
		this._easyRotating = true;
		this._easySpinCount = 0;
		if(bool) this._waitCount = 24;
	};

	Game_CharacterBase.prototype.easyAngle = function (angle = 0){
		this._easyRotating = this._easySpin || !!angle;
		this._easyAngle = angle;
	};

	Game_CharacterBase.prototype.easyShake = function (bool = true){
		this._easyShake = true;
		this._easyShakeCount = 0;
		if (bool) this._waitCount = 24;
	};

	Game_CharacterBase.prototype.easyBackoff = function (){
		this.moveBackward();
	};

	Game_CharacterBase.prototype.easyJump = function (){
		this.jump(0,0);
	};
	
	Game_CharacterBase.prototype.easyBackstep = function (){
		this.backstep();
	};

	Game_CharacterBase.prototype.backstep = function (){
		const dir = this.direction();
		const x = dir===6?-1:dir===4?1:0;
		const y = dir===2?-1:dir===8?1:0;
		const lastDirectionFix = this.isDirectionFixed();
		this.setDirectionFix(true);
		this.jump(x,y);
		this.setDirectionFix(lastDirectionFix);
	};

	Game_CharacterBase.prototype.easyBlink = function (bool = true){
		if (this._easyBlink !== bool) {
			this.setEasyBlinkTransparent(false);
			this._easyBlink = bool;
			this._easyBlinkCount = blinkInterval;
		}
	};
	
	Game_CharacterBase.prototype.easyTra = function (bool = true){
		this._easyTra = bool;
	};

	const _Game_Follower_update = Game_Follower.prototype.update;
	Game_Follower.prototype.update = function() {
		_Game_Follower_update.call(this);
		this.easyTra($gamePlayer._easyTra);
	};

	Game_Player.prototype.easyJump = function (){
		this._easyActionJumping = true;
		Game_CharacterBase.prototype.easyJump.call(this);
	};
	
	Game_Player.prototype.easyBackstep = function (){
		this._easyActionJumping = true;
		Game_CharacterBase.prototype.easyBackstep.call(this);
	};

	const _Sprite_Character_update = Sprite_Character.prototype.update;
	Sprite_Character.prototype.update = function() {
		_Sprite_Character_update.call(this);
		this.updateAngle();
		this.updateEasyActionHalfBody();
	};

	const _Sprite_Character_updateOther = Sprite_Character.prototype.updateOther;
	Sprite_Character.prototype.updateOther = function() {
		_Sprite_Character_updateOther.call(this);
		if (this._character._easyTra) {
			this.opacity -= Math.floor(this.opacity/2);
		}
	};
	//EventEffects対策
	const _Sprite_Character_updateAngle = Sprite_Character.prototype.updateAngle;
	const _Sprite_Balloon_updatePosition = Sprite_Balloon.prototype.updatePosition;
	if (_Sprite_Character_updateAngle) {
		Sprite_Character.prototype.updateAngle = function() {
			_Sprite_Character_updateAngle.call(this);
			if (this._character._easyRotating) {
				this.anchor.y = 0.5;
				this.rotation += (this._character._easyActionAngle + this._character._easyAngle) * Math.PI / 180;
			}
		};

		Sprite_Balloon.prototype.updatePosition = function() {
			_Sprite_Balloon_updatePosition.call(this);
			if (this._target._character._easyRotating) {
				this.rotation = 0;
			}
		};

	} else {
		Sprite_Character.prototype.updateAngle = function() {
			this.rotation = 0;
			this.anchor.y = 1;
			if (this._character._easyRotating) {
				this.anchor.y = 0.5;
				this.rotation += (this._character._easyActionAngle + this._character._easyAngle) * Math.PI / 180;
			}
		};
	}
	//茂み対策1
	const _Sprite_Character_updateHalfBodySprites = Sprite_Character.prototype.updateHalfBodySprites;
	Sprite_Character.prototype.updateHalfBodySprites = function() {
		_Sprite_Character_updateHalfBodySprites.call(this);
		if (this._bushDepth > 0) {
			this._lowerBody.y = 0;
		}
	};
	//茂み対策2
	Sprite_Character.prototype.updateEasyActionHalfBody = function() {
		if (this._character._easyRotating && this._upperBody) {
			const offsetY = this.height/2;
			this._upperBody.y += offsetY;
			this._lowerBody.y += offsetY;
		}
	};

	const _Sprite_Character_updatePosition = Sprite_Character.prototype.updatePosition;
	Sprite_Character.prototype.updatePosition = function() {
		_Sprite_Character_updatePosition.call(this);
		const character = this._character;
		if (character._easyActionX) {
			this.x += character._easyActionX;
		}
		if (character._easyRotating) {
			if (!character._easySpin && !character._easyAngle) {
				character._easyRotating = false;
				this.updateHalfBodySprites();
			} else {
				this.y -= this.height/2;
			}
		}
	};

	const _Game_Player_updateJump = Game_Player.prototype.updateJump;
	Game_Player.prototype.updateJump = function() {
		_Game_Player_updateJump.call(this);
		if (this._jumpCount === 0) {
			this._easyActionJumping = false;
		}
	};

	const _Game_Followers_jumpAll = Game_Followers.prototype.jumpAll;
	Game_Followers.prototype.jumpAll = function() {
		if (!$gamePlayer._easyActionJumping) {
			_Game_Followers_jumpAll.call(this);
		}
	};

	if (useMZ) {
		const _Sprite_Balloon_updatePosition = Sprite_Balloon.prototype.updatePosition;
		Sprite_Balloon.prototype.updatePosition = function() {
			_Sprite_Balloon_updatePosition.call(this);
			if (this._target._character._easyRotating) {
				this.y += this._target.height/2;
			}
		};
	} else {
		const _Sprite_Character_updateBalloon = Sprite_Character.prototype.updateBalloon;
		Sprite_Character.prototype.updateBalloon = function() {
			_Sprite_Character_updateBalloon.call(this);
			if (this._character._easyRotating && this._balloonSprite) {
				this._balloonSprite.y += this.height/2;
			}
		};
	}

	Tilemap.prototype._compareChildOrder = function(a, b) {
		if (a.z !== b.z) {
			return a.z - b.z;
		} else {
			const c = a._character && a._character._easyRotating ? -a.height/2 : 0;
			const d = b._character && b._character._easyRotating ? -b.height/2 : 0;
			if (a.y - c !== b.y - d) {
				return a.y - c  - b.y + d;
			} else {
				return a.spriteId - b.spriteId;
			}
		}
	};

	const _Game_Event_setupPageSettings = Game_Event.prototype.setupPageSettings;
	Game_Event.prototype.setupPageSettings = function() {
		_Game_Event_setupPageSettings.call(this);
		this.setupSettingsEasyAction();
	};

	Game_Event.prototype.setupSettingsEasyAction = function() {
		const page = this.page();
		this.easyAngle(page.easyAngle);
		this.easyBlink(page.easyBlink);
		this.easyTra(page.easyTra);
	};
	//マップデータロード時の処理に追加
	const _DataManager_onLoad = DataManager.onLoad;
	DataManager.onLoad = function(object) {
		_DataManager_onLoad.call(this,object);
		if (!!(object.data && object.events)) {
			this.addEasyAngleToCondition();
			this.addEasyActionToCondition('easyBlink');
			this.addEasyActionToCondition('easyTra');
		}
	};
	//メモ欄の情報を事前に解析し、$dataMapに書き込むことでリフレッシュ時の負担を軽減。実質的にイベントのオプションと同じ仕様にする。
	DataManager.addEasyAngleToCondition = function() {
		$dataMap.events.forEach( data => {
			if(!data) return;
			const pages = data.pages;
			const meta  = data.meta['easyAngle'];
			const easyAnglePages = this.analyticsEasyAngle(pages, meta);
			for (let i=0;i<=pages.length-1;i++) {
				pages[i]['easyAngle'] = easyAnglePages[i];
			}
		});
	};
	//解析
	DataManager.analyticsEasyAngle = function(pages,meta) {
		if (typeof meta === "boolean") {
			return Array(pages.length).fill(meta ? 180 : 0);
		} else {
			const easyAnglePages = Array(pages.length).fill(0);
			if (meta) {
				const arrMeta   = meta.split(',').map(Number);
				for (let i=0;arrMeta.length-1>=i;i++) {
					easyAnglePages[i] = arrMeta[i];
				}
			}
			return easyAnglePages;
		}
	};
	//点滅・半透明
	DataManager.addEasyActionToCondition = function(metaName) {
		$dataMap.events.forEach( data => {
			if(!data) return;
			const pages = data.pages;
			const meta  = data.meta[metaName];
			const blinkPages = this.analyticsEasyAction(pages, meta);
			for (let i=0;i<=pages.length-1;i++) {
				pages[i][metaName] = blinkPages[i];
			}
		});
	};
	//解析
	DataManager.analyticsEasyAction = function(pages, meta) {
		if (typeof meta === "boolean") {
			return Array(pages.length).fill(meta);
		} else {
			const blinkPages = Array(pages.length).fill(false);
			if (meta) {
				const arrMeta = meta.split(',').map(i => --i);
				for (let i=0;arrMeta.length-1>=i;i++) {
					blinkPages[arrMeta[i]] = true;
				}
			}
			return blinkPages;
		}
	};
}