/*:-----------------------------------------------------------------------------------
 * NUUN_SaveScreen.js
 * 
 * Copyright (C) 2021 NUUN
 * This software is released under the MIT License.
 * http://opensource.org/licenses/mit-license.php
 * -------------------------------------------------------------------------------------
 * 
 * 更新履歴
 * 2021/1/30 Ver.1.2.1
 * コンテンツエリアX座標の設定方法を変更
 * 2021/1/29 Ver.1.2.0
 * 顔グラの横幅、縦幅、拡大率を指定できるように変更。
 * セーブインフォがないファイルでファイル名が表示されない問題を修正。
 * 2021/1/26 Ver.1.1.1
 * 顔グラを表示時、ファイルタイトルが隠れて表示されてしまう問題を修正。
 * 2021/1/26 Ver.1.1.0
 * 顔グラを表示できる機能を追加。
 * 2021/1/24 Ver.1.0.0
 * 初版
 * 
 */ 
/*:
 * @target MZ
 * @plugindesc セーブ画面拡張
 * @author NUUN
 * @version 1.2.0
 * 
 * @help
 * セーブ画面にいくつかの項目を追加します。
 * 顔グラを表示できます。
 * キャラクター上にレベルを表示できます。
 * メイン文章（章など）を表示可能。（設定しない場合はタイトルが表示されます。何も表示させたくない場合はスペースを入れてください）
 * 現在地、所持金、任意の項目が表示可能です。
 * 
 * 仕様
 * 拡大率は１００でセーブインフォ表示縦幅に関係なくデフォルトサイズで表示されます。
 * それ以外は画像の縦幅（表示縦幅ではない）がセーブインフォ表示縦幅を超えるようであればそれ以下にサイズ調整されます。
 *
 * 右側の表示項目をなしにすると左側の表示項目が広く表示されます。
 * 
 * コンテンツエリアX座標を-1にすることで右寄りに表示されます。
 * 
 * 
 * 利用規約
 * このプラグインはMITライセンスで配布しています。
 * 
 * @param Font
 * @text フォント設定
 * 
 * @param MainFontSizeMainFontSize
 * @desc ファイルタイトル、メイン文章のフォントサイズ
 * @text ファイルタイトル、メイン文章フォントサイズ
 * @type number
 * @default 24
 * @min 0
 * @parent Font
 * 
 * @param ContentsFontSizeMainFontSize
 * @desc 各コンテンツのフォントサイズ
 * @text 各コンテンツフォントサイズ
 * @type number
 * @default 22
 * @parent Font
 * 
 * @param AnyName
 * @text メイン文章
 *
 * @param AnyNameVariable
 * @desc メイン文章番号
 * @text メイン文章番号
 * @type variable
 * @default 0
 * @parent AnyName
 * 
 * @param AnyDefaultName
 * @desc メイン文章デフォルト文字列
 * @text メイン文章デフォルト文字列
 * @type string
 * @default
 * @parent AnyName
 * 
 * @param AnyNameList
 * @desc メイン文章文字列リスト
 * @text メイン文章文字列リスト
 * @type string[]
 * @default []
 * @parent AnyName
 * 
 * @param Actor
 * @text アクター設定
 * 
 * @param ActorX
 * @desc アクターのX座標（相対座標）デフォルト:40
 * @text アクターX座標
 * @type number
 * @default 40
 * @parent Actor
 * 
 * @param ActorY
 * @desc アクターのY座標（相対座標）
 * @text アクターY座標
 * @type number
 * @default 0
 * @min -9999
 * @parent Actor
 * 
 * @param FaceMode
 * @desc キャラチップではなく顔グラを表示します。
 * @text 顔グラ表示
 * @type boolean
 * @default false
 * @parent Actor
 * 
 * @param FaceWidth
 * @desc 顔グラの横幅
 * @text 顔グラの横幅
 * @type number
 * @default 144
 * @min 0
 * @parent Actor
 * 
 * @param FaceHeight
 * @desc 顔グラの縦幅
 * @text 顔グラの縦幅
 * @type number
 * @default 144
 * @parent Actor
 * 
 * @param FaceScale
 * @desc 顔グラの拡大率
 * @text 拡大率
 * @type number
 * @default 100
 * @parent Actor
 * 
 * @param LevelPosition
 * @desc レベルの表示位置。
 * @text レベル表示位置
 * @type select
 * @option 表示しない
 * @value 0
 * @option 下
 * @value 1
 * @option 上
 * @value 2
 * @default 1
 * @parent Actor
 * 
 * @param Contents
 * @text 各コンテンツ設定
 * 
 * @param ContentsRight
 * @text コンテンツエリアを右寄りに表示
 * @desc コンテンツエリア右寄り
 * @type boolean
 * @default true
 * @parent Contents
 * 
 * @param ContentsX
 * @desc コンテンツエリアのX座標
 * @text コンテンツエリアX座標
 * @type number
 * @default 0
 * @min 0
 * @parent Contents
 * 
 * @param ContentsWidth
 * @desc コンテンツエリアの横幅（０でデフォルト幅）
 * @text コンテンツエリア横幅
 * @type number
 * @default 0
 * @min 0
 * @parent Contents
 * 
 * @param PlaytimeName
 * @desc プレイ時間名称
 * @text プレイ時間名称
 * @type string
 * @default
 * @parent Contents
 * 
 * @param LocationName
 * @desc 現在地名称
 * @text 現在地名称
 * @type string
 * @default
 * @parent Contents
 * 
 * @param MoneyName
 * @desc 所持金名称
 * @text 所持金名称
 * @type string
 * @default
 * @parent Contents
 * 
 * @param T_Left
 * @desc 左上に表示する項目。
 * @text 左上表示項目
 * @type select
 * @option なし
 * @value 0
 * @option プレイ時間
 * @value 1
 * @option 現在地
 * @value 2
 * @option 所持金
 * @value 3
 * @option 任意項目１
 * @value 10
 * @option 任意項目２
 * @value 11
 * @default 2
 * @parent Contents
 * 
 * @param T_Right
 * @desc 右上に表示する項目。
 * @text 右上表示項目
 * @type select
 * @option なし
 * @value 0
 * @option プレイ時間
 * @value 1
 * @option 現在地
 * @value 2
 * @option 所持金
 * @value 3
 * @option 任意項目１
 * @value 10
 * @option 任意項目２
 * @value 11
 * @default 0
 * @parent Contents
 * 
 * @param B_Left
 * @desc 左下に表示する項目。
 * @text 左下表示項目
 * @type select
 * @option なし
 * @value 0
 * @option プレイ時間
 * @value 1
 * @option 現在地
 * @value 2
 * @option 所持金
 * @value 3
 * @option 任意項目１
 * @value 10
 * @option 任意項目２
 * @value 11
 * @default 3
 * @parent Contents
 * 
 * @param B_Right
 * @desc 右下に表示する項目。
 * @text 右下表示項目
 * @type select
 * @option なし
 * @value 0
 * @option プレイ時間
 * @value 1
 * @option 現在地
 * @value 2
 * @option 所持金
 * @value 3
 * @option 任意項目1
 * @value 10
 * @option 任意項目２
 * @value 11
 * @default 1
 * @parent Contents
 * 
 * @param OriginalName1
 * @desc 任意項目名１
 * @text 任意項目名１
 * @type string
 * @default
 * @parent Contents
 * 
 * @param OriginalEval1
 * @desc 評価式１
 * @text 評価式１
 * @type string
 * @default
 * @parent Contents
 * 
 * @param OriginalName2
 * @desc 任意項目名２
 * @text 任意項目名２
 * @type string
 * @default
 * @parent Contents
 * 
 * @param OriginalEval2
 * @desc 評価式２
 * @text 評価式２
 * @type string
 * @default
 * @parent Contents
 * 
 */
var Imported = Imported || {};
Imported.NUUN_SaveScreen = true;

(() => {
  const parameters = PluginManager.parameters('NUUN_SaveScreen');
  const MainFontSizeMainFontSize = Number(parameters['MainFontSizeMainFontSize'] || 24);
  const ContentsFontSizeMainFontSize = Number(parameters['ContentsFontSizeMainFontSize'] || 22);
  const ActorX = Number(parameters['ActorX'] || 40);
  const ActorY = Number(parameters['ActorY'] || 0);
  const FaceWidth = Number(parameters['FaceWidth'] || 144);
  const FaceHeight = Number(parameters['FaceHeight'] || 144);
  const FaceScale = Number(parameters['FaceScale'] || 100);
  const LevelPosition = Number(parameters['LevelPosition'] || 1);
  const FaceMode = eval(parameters['FaceMode'] || "false");
  const ContentsX = Number(parameters['ContentsX'] || 0);//ContentsRight
  const ContentsRight = eval(parameters['ContentsRight'] || "true");
  const _ContentsWidth = Number(parameters['ContentsWidth'] || 0);
  const AnyNameVariable = Number(parameters['AnyNameVariable'] || 0);
  const AnyDefaultName = String(parameters['AnyDefaultName'] || "");
  const AnyNameList = JSON.parse(parameters['AnyNameList']);
  const PlaytimeName = String(parameters['PlaytimeName'] || "プレイ時間");
  const LocationName = String(parameters['LocationName'] || "現在地");
  const MoneyName = String(parameters['MoneyName'] || "所持金");
  const T_Left = Number(parameters['T_Left'] || 1);
  const T_Right = Number(parameters['T_Right'] || 0);
  const B_Left = Number(parameters['B_Left'] || 3);
  const B_Right = Number(parameters['B_Right'] || 1);
  const OriginalName1 = String(parameters['OriginalName1'] || "");
  const OriginalName2 = String(parameters['OriginalName2'] || "");
  const OriginalEval1 = String(parameters['OriginalEval1'] || "");
  const OriginalEval2 = String(parameters['OriginalEval2'] || "");

  const _DataManager_makeSavefileInfo  = DataManager.makeSavefileInfo ;
  DataManager.makeSavefileInfo = function() {
    const info = _DataManager_makeSavefileInfo.call(this);
    info.AnyName = $gameVariables.value(AnyNameVariable);
    info.mapname = $gameMap.displayName();
    info.gold = $gameParty._gold;
    info.levelActor = $gameParty.actorLevelForSavefile();
    info.OriginalDate1 = eval(OriginalEval1);
    info.OriginalDate2 = eval(OriginalEval2);
    return info;
  };

  const _Window_SavefileList_drawItem = Window_SavefileList.prototype.drawItem;
  Window_SavefileList.prototype.drawItem = function(index) {
    this._FaceOn = false;
    _Window_SavefileList_drawItem.call(this, index);
    const savefileId = this.indexToSavefileId(index);
    if (!DataManager.savefileInfo(savefileId)) {
      this._FaceOn = true;
    }
    const rect = this.itemRectWithPadding(index);
    this.drawTitle(savefileId, rect.x, rect.y + 4);
  };

  const _Window_SavefileList_drawTitle = Window_SavefileList.prototype.drawTitle;
  Window_SavefileList.prototype.drawTitle = function(savefileId, x, y) {
    if (this._FaceOn) {
      this.contents.fontSize = MainFontSizeMainFontSize;
      _Window_SavefileList_drawTitle.call(this, savefileId, x, y - 4);
      this.contents.fontSize = $gameSystem.mainFontSize();
      this._FaceOn = false;
    }
  };

  Window_SavefileList.prototype.drawContents = function(info, rect) {
    //キャラクター
    if (rect.width >= 420) {
      this._maxHeight = rect.height - 4
      let x = ActorX + rect.x;
      let width = 0;
      let height = 0;
      if (FaceMode) {
        let y = ActorY + rect.y + 2;
        const scale = FaceScale / 100;
        width = FaceWidth > 0 ? FaceWidth : ImageManager.faceWidth;
        height = FaceHeight > 0 ? FaceHeight : ImageManager.faceHeight;
        const heightScale = height * scale;
        this._scaleMode = 0;
        if (heightScale === height) {
          height = Math.min(height, this._maxHeight);
          this._scaleMode = 0;
        } else if (heightScale > this._maxHeight){
          this._scaleMode = 1;
        }
        this.drawPartyFace(info, x, y, width, height);
      } else {
        const bottom = rect.y + (ActorY !== 0 ? ActorY : rect.height) + ActorY;
        this.drawPartyCharacters(info, x, bottom - 8);
      }
    }
    this._FaceOn = true;
    //任意の文字列
    this.drawAnyName(info, rect.x + 200, rect.y + 2, rect.width - 200);
    //フリーゾーン
    const padding = this.itemPadding();
    height = Math.floor(rect.height / 3);
    const sx = !ContentsRight ? ContentsX : (_ContentsWidth > 0 ? Graphics.boxWidth - _ContentsWidth - 48 : 240);
    let x2 = rect.x + sx;
    let y2 = (height) + rect.y - 2;_ContentsWidth
    width = (_ContentsWidth > 0 ? _ContentsWidth : rect.width - sx) / (T_Right === 0 ? 1 : 2);
    this.drawContentsBase(info, x2, y2, width - padding, T_Left);
    x2 += width;
    this.drawContentsBase(info, x2, y2, width - padding, T_Right);
    x2 = rect.x + sx;
    y2 += height - 2;
    width = (_ContentsWidth > 0 ? _ContentsWidth : rect.width - sx) / (B_Right === 0 ? 1 : 2);
    this.drawContentsBase(info, x2, y2, width - padding, B_Left);
    x2 += width;
    this.drawContentsBase(info, x2, y2, width - padding, B_Right);
  };

  Window_SavefileList.prototype.drawContentsBase = function(info, x, y, width, value) {
    switch (value) {
      case 0:
        break;
      case 1:
        this.drawPlaytime(info, x, y, width);
        break;
      case 2:
        this.drawMapName(info, x, y, width);
        break;
      case 3:
        this.drawGold(info, x, y, width);
        break;
      case 10:
        this.drawOriginal_1(info, x, y, width);
        break;
      case 11:
        this.drawOriginal_2(info, x, y, width);
        break;
    }
  };
  const _Window_SavefileList_drawPartyCharacters = Window_SavefileList.prototype.drawPartyCharacters;
  Window_SavefileList.prototype.drawPartyCharacters = function(info, x, y) {
    _Window_SavefileList_drawPartyCharacters.call(this, info, x, y);
    if (info.characters) {
      this.drawPartyLeval(info, x - 21, y, 48, 0, 0);
    }
  };

  Window_SavefileList.prototype.drawPartyFace = function(info, x, y, width, height) {
    if (info.faces) {
        let characterX = x;
        const faceWidth = this._scaleMode === 1 ? this._maxHeight : Math.floor(width * FaceScale / 100);
        for (const data of info.faces) {
          this.drawFace(data[0], data[1], characterX, y, width, height);
          characterX += faceWidth;
        }
        this.drawPartyLeval(info, x + 8, y, faceWidth, height, 1);
    }
  };

  Window_SavefileList.prototype.drawPartyLeval = function(info, x, y, width, height, mode) {
    this.contents.fontSize = mode === 0 ? 16 : ContentsFontSizeMainFontSize;
    if (info.levelActor && LevelPosition > 0) {
      let levelActorX = x;
      let textWidth = width;
      let y2 = y;
      if (mode === 0) {
        y2 = y2 - (LevelPosition === 2 ? Math.min(84 - MainFontSizeMainFontSize, 60) : 24);
        textWidth -= 6;
      } else {
        if (LevelPosition === 2) {
          y2 += Math.max(MainFontSizeMainFontSize - ActorY, 0) - 4;
        } else {
          y2 += this._maxHeight - ContentsFontSizeMainFontSize - 12;
        }
        textWidth = Math.max(width / 2, 72) - 8;
      }
      for (const data of info.levelActor) {
        this.changeTextColor(ColorManager.systemColor());
        this.drawText(TextManager.levelA, levelActorX, y2, textWidth);
        this.resetTextColor();
        this.drawText(data, levelActorX, y2, textWidth, "right");
        levelActorX += width;
      }
    }
    this.resetFontSettings();
  };

  Window_SavefileList.prototype.drawAnyName = function(info, x, y, width) {
    this.contents.fontSize = MainFontSizeMainFontSize;
    let anyName = info.AnyName;
    if (anyName < 0) {
      nametext = AnyDefaultName ? AnyDefaultName : info.title;
    }
    if (anyName >= 0) {
      nametext = AnyNameList[anyName];
    }
    this.drawText(nametext , x, y, width, "left");
    this.contents.fontSize = $gameSystem.mainFontSize();
  };

  const _Window_SavefileList_drawPlaytime = Window_SavefileList.prototype.drawPlaytime;
  Window_SavefileList.prototype.drawPlaytime = function(info, x, y, width) {
    const contentsWidth = this.textWidth(PlaytimeName);
    this.contents.fontSize = ContentsFontSizeMainFontSize;
    this.changeTextColor(ColorManager.systemColor());
    this.drawText(PlaytimeName, x, y, contentsWidth);
    this.resetTextColor();
    _Window_SavefileList_drawPlaytime.call(this, info, x + contentsWidth, y, width - contentsWidth);
    this.contents.fontSize = $gameSystem.mainFontSize();
  };

  Window_SavefileList.prototype.drawMapName = function(info, x, y, width) {
    const contentsWidth = this.textWidth(LocationName);
    this.contents.fontSize = ContentsFontSizeMainFontSize;
    this.changeTextColor(ColorManager.systemColor());
    this.drawText(LocationName, x, y, contentsWidth);
    this.resetTextColor();
    if (info.mapname) {
      this.drawText(info.mapname, x + contentsWidth, y, width - contentsWidth, "right");
    }
    this.contents.fontSize = $gameSystem.mainFontSize();
  };

  Window_SavefileList.prototype.drawGold = function(info, x, y, width) {
    const contentsWidth = this.textWidth(MoneyName);
    this.contents.fontSize = ContentsFontSizeMainFontSize;
    this.changeTextColor(ColorManager.systemColor());
    this.drawText(MoneyName, x, y, contentsWidth);
    this.resetTextColor();
    if (info.gold !== undefined) {
      const unit = TextManager.currencyUnit;
      this.drawCurrencyValue(info.gold, unit, x + contentsWidth, y, width - contentsWidth)
    }
    this.contents.fontSize = $gameSystem.mainFontSize();
  };

  Window_SavefileList.prototype.drawOriginal_1 = function(info, x, y, width) {
    const contentsWidth = this.textWidth(OriginalName1);
    this.contents.fontSize = ContentsFontSizeMainFontSize;
    this.changeTextColor(ColorManager.systemColor());
    this.drawText(OriginalName1, x, y, contentsWidth);
    this.resetTextColor();
    if (info.OriginalDate1) {
      this.drawText(info.OriginalDate1, x + contentsWidth, y, width - contentsWidth, "right");
    }
    this.contents.fontSize = $gameSystem.mainFontSize();
  };

  Window_SavefileList.prototype.drawOriginal_2 = function(info, x, y, width) {
    const contentsWidth = this.textWidth(OriginalName2);
    this.contents.fontSize = ContentsFontSizeMainFontSize;
    this.changeTextColor(ColorManager.systemColor());
    this.drawText(OriginalName2, x, y, contentsWidth);
    this.resetTextColor();
    if (info.OriginalDate2) {
      this.drawText(info.OriginalDate2, x + contentsWidth, y, width - contentsWidth, "right");
    }
    this.contents.fontSize = $gameSystem.mainFontSize();
  };

  Window_SavefileList.prototype.drawFace = function(faceName, faceIndex, x, y, width, height) {
    width = width || ImageManager.faceWidth;
    height = height || ImageManager.faceHeight;
    const scale = FaceScale / 100;
    const bitmap = ImageManager.loadFace(faceName);
    const pw = ImageManager.faceWidth;
    const ph = ImageManager.faceHeight;
    const sw = Math.min(width, pw);
    const sh = Math.min(height, ph);
    const dx = Math.floor(x + Math.max(width - pw, 0) / 2);
    const dy = Math.floor(y + Math.max(height - ph, 0) / 2);
    const sx = Math.floor((faceIndex % 4) * pw + (pw - sw) / 2);
    const sy = Math.floor(Math.floor(faceIndex / 4) * ph + (ph - sh) / 2);
    const dw = this._scaleMode === 1 ? this._maxHeight : Math.floor(sw * scale);
    const dh = this._scaleMode === 1 ? this._maxHeight : Math.floor(sh * scale);
    this.contents.blt(bitmap, sx, sy, sw, sh, dx, dy, dw, dh);
};

  Game_Party.prototype.actorLevelForSavefile = function() {
    return this.battleMembers().map(actor => [
        actor._level,
    ]);
  };

})();