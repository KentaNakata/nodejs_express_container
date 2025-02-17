//=============================================================================
// MOG_Weather_EX.js
//=============================================================================

/*:ja
 * @target MZ
 * @plugindesc (v1.4) 新しい天候効果を追加します。
 * @author Moghunter
 * @url https://raw.githubusercontent.com/harizumi/Moghunter-MZ-jp/main/MOG_Weather_EX.js
 *
 * @param Battle Weather
 * @text 戦闘での天候有効化
 * @default true
 * @type boolean
 * @on 有効
 * @off 無効
 *
 * @command weatherEX
 * @desc 天候の設定
 * @text 天候効果を設定
 *
 * @arg id
 * @desc インデックス定義(0..20)
 * @text インデックス
 * @default 0
 * @type number
 * @min 0
 * @max 20
 *
 * @arg mode
 * @desc 気候のタイプの指定
 * @text 天候
 * @type select
 * @default Wind 1
 * @option 風1(落下)
 * @value Wind 1
 * @option 風2(左側)
 * @value Wind 2
 * @option 風3(ズーム)
 * @value Wind 3
 * @option 火花1
 * @value Spark 1
 * @option 火花2(マジカルフィールド)
 * @value Spark 2
 * @option 火花3(ホタル)
 * @value Spark 3
 * @option 火花4(マジカルフィールド2)
 * @value Spark 4
 * @option 炎1(両面)
 * @value Fire 1
 * @option 火2(片側)
 * @value Fire 2
 * @option 火3(爆発)
 * @value Fire 3
 * @option 雪1
 * @value Snow 1
 * @option 雪2(嵐)
 * @value Snow 2
 * @option 雪3(凍結)
 * @value Snow 3
 * @option 雨1
 * @value Rain 1
 * @option 雨2(しぶき)
 * @value Rain 2
 * @option 雨3(ズーム)
 * @value Rain 3
 * @option 雲1(フォグ効果)
 * @value Cloud 1
 * @option 雲2(正面ズーム)
 * @value Cloud 2
 * @option 雲3(強い)
 * @value Cloud 3
 * @option ランダム1
 * @value Random 1
 * @option ランダム2(ズーム)
 * @value Random 2
 * @option ランダム3(コスモ)
 * @value Random 3
 * @option サンシャイン
 * @value Sunshine
 * @option 霧
 * @value Fog
 * @option 蒸気
 * @value Steam
 * @option ライトスピード
 * @value LightSpeed
 * @option 流れ星1
 * @value Shooting Star 1
 * @option 流れ星2(回転)
 * @value Shooting Star 2
 * @option シャイニング
 * @value Shinning
 * @option バウンス
 * @value Bouncing
 * @option 泡
 * @value Bubbles
 * @option スタンドスティル
 * @value StandStill
 * @option フォグXPスタイル(横スクロール)
 * @value Fog XP Style Horz
 * @option フォグXPスタイル(縦スクロール)
 * @value Fog XP Style Vert
 * @option オーバーレイ1(タイリングモード -> スプライトループ)
 * @value Overlay 1
 * @option オーバーレイ2(スプライトモード -> ラグが少ない)
 * @value Overlay 2
 *
 * @arg power
 * @desc 粒子の量の指定
 * (1 .. 2000)
 * @text 粒子数
 * @type number
 * @default 30
 * @type number
 * @min 1
 * @max 2000
 *
 * @arg z
 * @desc 気候の優先順位。
 * @text レイヤー(Zインデックス)
 * @type select
 * @default Normal
 * @option 下(タイルセットの下)
 * @value Below
 * @option 普通
 * @value Normal
 *
 * @arg blendType
 * @desc 合成方法の指定
 * @text 合成方法
 * @type select
 * @default Normal
 * @option 加算
 * @value Additive
 * @option 普通
 * @value Normal
 * @option 乗算
 * @value Multiply
 *
 * @arg fileName
 * @desc 画像名の指定
 * @text ファイル名
 * @default Leaf_01A
 * @type file
 * @dir img/weather/
 *
 * @arg speed
 * @desc 天候の速度を指定
 * (20% -> 800%)
 * @text 速度 (%)
 * @type number
 * @min 20
 * @max 1000
 * @default 100
 *
 * @arg scale
 * @desc 粒子サイズの指定
 * (20% -> 800%)
 * @text ズーム(%)
 * @type number
 * @min 20
 * @max 800
 * @default 100
 *
 *
 * @command weatherEXRemove
 * @desc 天候を削除します
 * @text 削除
 *
 * @arg id
 * @desc 天候を削除します(0..20)
 * @text インデックス
 * @default 0
 * @type number
 * @min 0
 * @max 20
 *
 *
 * @command weatherEXRemoveAll
 * @desc 全ての天候を削除します。
 * @text 全削除
 * @default
 *
 *
 * @command weatherEXBattle
 * @desc 戦闘中の天候を有効化または無効化します。
 * @text 戦闘天候
 *
 * @arg enable
 * @desc 戦闘で天候を有効化
 * @text 戦闘での有効化
 * @type boolean
 * @default true
 * @on 有効
 * @off 無効
 *
 *
 * @help
 * 翻訳:
 * https://fungamemake.com/
 *
 * ===========================================================================
 * ♦♦♦ MOG - Weather EX ♦♦♦
 * Author   -   Moghunter
 * Version  -   1.4
 * Updated  -   2021/04/16
 * https://mogplugins.wordpress.com
 * ===========================================================================
 * 新しい天候効果を追加します。
 * 天候画像はフォルダに保存する必要があります。 (img/weather/)
 *
 * ===========================================================================
 * - プラグインコマンド
 * ===========================================================================
 * 各種の天候を動作させるプラグインコマンドがあります。
 * 
 * ===========================================================================
 * - マップのメモタグ
 * ===========================================================================
 * 天候を有効にするには、以下のメモタグを使用してください。
 *
 * weather ID : TYPE : POWER : SPEED : BLEND_TYPE : FILE_NAME
 *
 * -> ID   - 天候IDを設定すると、同時に最大10種類の天候を使用できます。
 *
 * -> TYPE - 効果(0から36)
 *      0  - 風1(落下)
 *      1  - 風2(左側)
 *      2  - 風3(ズーム)
 *      3  - 火花1
 *      4  - 火花2(マジカルフィールド)
 *      5  - 火花3(ホタル)
 *      6  - 炎1(両面)
 *      7  - 火2(片側)
 *      8  - 火3(爆発)
 *      9  - 雪1
 *      10 - 雪2(嵐)
 *      11 - 雪3(凍結)
 *      12 - 雨1
 *      13 - 雨2(しぶき)
 *      14 - 雨3(ズーム)
 *      15 - 雲1(フォグ効果)
 *      16 - 雲2(正面ズーム)
 *      17 - 雲3(強い)
 *      18 - ランダム1
 *      19 - ランダム2(ズーム)
 *      20 - ランダム3(コスモ)
 *      21 - サンシャイン
 *      22 - 霧
 *      23 - 蒸気
 *      24 - ライトスピード
 *      25 - 流れ星1
 *      26 - 流れ星2(回転)
 *      27 - シャイニング
 *      28 - バウンス
 *      29 - 火花4(マジックフィールド2 / 対角線)
 *      30 - 泡
 *      31 - スタンドスティル
 *      32 - フォグXPスタイル(横スクロール)
 *      33 - フォグXPスタイル(縦スクロール)
 *      35 - オーバーレイ1(タイリングモード -> スプライトループ)
 *      36 - オーバーレイ2(スプライトモード -> ラグが少ない)
 *
 * -> POWER - 天候の力 (粒子数)(1から2000)
 *
 * -> SPEED - アニメーションの速度を設定 (0から1000%)
 *
 * -> BLEND_TYPE - 合成方法 (0:通常 / 1:加算)
 *
 * -> FILE_NAME = 画像のファイル名
 *
 * -------------------------------------
 * 例
 * weather : 0 : 0 : 40 : 100 : 0 : Leaf_02B
 * -------------------------------------
 *
 * ===========================================================================
 * - オフセットコマンド(マップのメモタグ)
 * ===========================================================================
 * weather : ID : TYPE : POWER : SPEED : BLEND_TYPE : FILE_NAME : Z-INDEX : ZOOM
 *
 * -> Z-INDEX         - 天候がタイルセットの上になるか下になるかを定義します。
 *                        0  - タイルセットの下
 *                        1  - タイルセットの上
 *
 * -> ZOOM            - 画像のサイズを拡大または縮小します。 (0から800%)
 *                      100 = 100%
 *
 * -------------------------------------
 * 例
 * weather : 0 : 0 : 40 : 100 : 0 : Leaf_02B : 1 : 100
 * -------------------------------------
 *
 * ===========================================================================
 * * 更新履歴
 * ===========================================================================
 * (v1.4) - MOG_BattleCameraとの互換性。
 * (v1.3) - エンコーディングに関連するソート機能を修正。
 * (v1.2) - 画像ファイルの選択に関するプラグインコマンドを改善。
 * (v1.1) - ButtonPictureプラグインとの互換性を修正。
 */

//=============================================================================
// ** PLUGIN PARAMETERS
//=============================================================================

var Imported = Imported || {};
Imported.MOG_Weather_EX = true;
var Moghunter = Moghunter || {};

Moghunter.parameters = PluginManager.parameters('MOG_Weather_EX');
Moghunter.weatherEX_max = Number(Moghunter.parameters['Weather Max'] || 20);
Moghunter.weatherEX_battle = String(Moghunter.parameters['Battle Weather'] || "true");
Moghunter.weatherEX_layer1 = Number(Moghunter.parameters['Layer 1 - Z-Index'] || 0);
Moghunter.weatherEX_layer2 = Number(Moghunter.parameters['Layer 2 - Z-Index'] || 50);
Moghunter.weatherEX_layer3 = Number(Moghunter.parameters['Layer 3 - Z-Index'] || 110);


//=============================================================================
// ■■■  PluginManager ■■■ 
//=============================================================================	

PluginManager.registerCommand('MOG_Weather_EX', "weatherEX", data => {
	$gameSystem.weatherEXPluginCom(data);
});

PluginManager.registerCommand('MOG_Weather_EX', "weatherEXRemove", data => {
	$gameSystem.weatherEXPluginComRemove(data);
});

PluginManager.registerCommand('MOG_Weather_EX', "weatherEXRemoveAll", data => {
	$gameSystem.weatherEXPluginComRemoveAll();
});

PluginManager.registerCommand('MOG_Weather_EX', "weatherEXBattle", data => {
	$gameSystem.weatherEXPluginComBattle(data);
});

//=============================================================================
// ■■■ ImageManager ■■■ 
//=============================================================================

//==============================
// * Weather
//==============================
ImageManager.loadWeather = function (filename) {
	return this.loadBitmap('img/weather/', filename, 0, true);
};

//=============================================================================
// ■■■ Game System ■■■
//=============================================================================

//==============================
// ♦ ALIAS ♦  Initialize
//==============================
var _mog_weatherEX_system_initialize = Game_System.prototype.initialize;
Game_System.prototype.initialize = function () {
	_mog_weatherEX_system_initialize.call(this);
	this._weatherEXScnBat = String(Moghunter.weatherEX_battle) === "true" ? true : false;
	this._weatherEX_MapId = -1;
	this._weatherSkipReLoad = false;
	this.weatherEX_initialize(false);
};

//==============================
// * weather EX initialize
//==============================
Game_System.prototype.weatherEX_initialize = function (needrefresh) {
	this._weatherSprites = null;
	this._weatherPreData = null;
	if (this._weatherEX_Data == null) { this._weatherEX_Data = [] };
	for (var i = 0; i < Moghunter.weatherEX_max; i++) {
		this.clearWeatherEX(i, needrefresh);
	};
};

//==============================
// * clear Weather EX
//==============================
Game_System.prototype.clearWeatherEX = function (id, needrefresh) {
	this._needRefreshWeatherEX = needrefresh;
	this._weatherEX_Data[id] = {};
	this._weatherEX_Data[id].mode = -1;
	this._weatherEX_Data[id].power = 0;
	this._weatherEX_Data[id].fileName = "";
	this._weatherEX_Data[id].z = 0;
	this._weatherEX_Data[id].blendMode = 0;
	this._weatherEX_Data[id].speed = 0;
	this._weatherEX_Data[id].rot = 0;
	this._weatherEX_Data[id].scale = 0;
	this._weatherEX_Data[id].frames = 1
	this._weatherEX_Data[id].needRefresh = needrefresh;
};

//==============================
// * weather EXPluginComRemove
//==============================
Game_System.prototype.weatherEXPluginComRemove = function (data) {
	var idReal = Math.min(Math.max(Number(data.id), 0), $gameSystem._weatherEX_Data.length - 1);
	this.clearWeatherEX(idReal);
};

//==============================
// * weather EXPluginComRemove All
//==============================
Game_System.prototype.weatherEXPluginComRemoveAll = function () {
	$gameSystem.weatherEX_initialize(true)
};

//==============================
// * weather EXPluginComBattle
//==============================
Game_System.prototype.weatherEXPluginComBattle = function (data) {
	$gameSystem._weatherEXScnBat = String(data.enable) == "true" ? true : false;
};

//==============================
// * Command Setup Weather
//==============================
Game_System.prototype.commandSetupWeather = function (args) {
	var id = args[1] != null ? Number(args[1]) : 0;
	var mode = args[3] != null ? Number(args[3]) : 0;
	var power = args[5] != null ? Number(args[5]) : 1;
	var speed = args[7] != null ? Number(args[7]) : 100;
	var blendType = args[9] != null ? Number(args[9]) : 0;
	var fileName = args[11] != null ? String(args[11]) : "";
	var z = args[13] != null ? Number(args[13]) : 1;
	var scale = args[15] != null ? Number(args[15]) : 100;
	var frame = args[17] != null ? Number(args[17]) : 1;
	var frameSpeed = args[19] != null ? Number(args[19]) : 10;
	var id_Real = Math.min(Math.max(id, 0), $gameSystem._weatherEX_Data.length - 1);
	var mode_Real = Math.min(Math.max(mode, 0), 35);
	var power_Real = Math.max(power, 1);
	var z_Real = Math.min(Math.max(z, 0), 2);
	var blendType_Real = Math.min(Math.max(blendType, 0), 2);
	var scale_Real = Math.min(Math.max(scale, 0), 800);
	var speed_Real = Math.min(Math.max(speed, 0), 1000);
	this._weatherEX_Data[id_Real].mode = mode_Real;
	this._weatherEX_Data[id_Real].power = power_Real;
	this._weatherEX_Data[id_Real].z = z_Real;
	this._weatherEX_Data[id_Real].blendMode = blendType_Real;
	this._weatherEX_Data[id_Real].fileName = fileName;
	this._weatherEX_Data[id_Real].speed = speed_Real;
	this._weatherEX_Data[id_Real].scale = scale_Real;
	this._weatherEX_Data[id_Real].frames = 1;
	this._weatherEX_Data[id_Real].frameSpeed = 4;
	this._weatherEX_Data[id_Real].needRefresh = true;
	this._needRefreshWeatherEX = true;
};

//==============================
// * weather EX Plugin Com
//==============================
Game_System.prototype.weatherEXPluginCom = function (data) {
	var id_Real = Math.min(Math.max(Number(data.id), 0), $gameSystem._weatherEX_Data.length - 1);
	var mode = this.weatherGetMode(data.mode);
	var mode_Real = Math.min(Math.max(mode, 0), 35);
	var power_Real = Math.min(Math.max(Number(data.power), 1), 2000);
	var fileName = String(data.fileName)
	var zIndex = this.weatherGetZ(data.z);
	var z_Real = Math.min(Math.max(zIndex, 0), 2);
	var blend = this.weatherGetBlend(data.blendType);
	var blendType_Real = Math.min(Math.max(blend, 0), 2);
	var scale_Real = Math.min(Math.max(Number(data.scale), 20), 800);
	var speed_Real = Math.min(Math.max(Number(data.speed), 20), 1000);
	this._weatherEX_Data[id_Real].mode = mode_Real;
	this._weatherEX_Data[id_Real].power = power_Real;
	this._weatherEX_Data[id_Real].z = z_Real;
	this._weatherEX_Data[id_Real].blendMode = blendType_Real;
	this._weatherEX_Data[id_Real].fileName = fileName;
	this._weatherEX_Data[id_Real].speed = speed_Real;
	this._weatherEX_Data[id_Real].scale = scale_Real;
	this._weatherEX_Data[id_Real].frames = 1;
	this._weatherEX_Data[id_Real].frameSpeed = 4;
	this._weatherEX_Data[id_Real].needRefresh = true;
	this._needRefreshWeatherEX = true;
};

//==============================
// * weather get Mode
//==============================
Game_System.prototype.weatherGetMode = function (mode) {
	if (mode == "Wind 1") {
		return 0
	} else if (mode == "Wind 2") {
		return 1;
	} else if (mode == "Wind 3") {
		return 2;
	} else if (mode == "Spark 1") {
		return 3;
	} else if (mode == "Spark 2") {
		return 4;
	} else if (mode == "Spark 3") {
		return 5;
	} else if (mode == "Spark 4") {
		return 29;
	} else if (mode == "Fire 1") {
		return 6;
	} else if (mode == "Fire 2") {
		return 7;
	} else if (mode == "Fire 3") {
		return 8;
	} else if (mode == "Snow 1") {
		return 9;
	} else if (mode == "Snow 2") {
		return 10;
	} else if (mode == "Snow 3") {
		return 11;
	} else if (mode == "Rain 1") {
		return 12;
	} else if (mode == "Rain 2") {
		return 13;
	} else if (mode == "Rain 3") {
		return 14;
	} else if (mode == "Cloud 1") {
		return 15;
	} else if (mode == "Cloud 2") {
		return 16;
	} else if (mode == "Cloud 3") {
		return 17;
	} else if (mode == "Random 1") {
		return 18;
	} else if (mode == "Random 2") {
		return 19;
	} else if (mode == "Random 3") {
		return 20;
	} else if (mode == "Sunshine") {
		return 21;
	} else if (mode == "Fog") {
		return 22;
	} else if (mode == "Steam") {
		return 23;
	} else if (mode == "LightSpeed") {
		return 24;
	} else if (mode == "Shooting Star 1") {
		return 25;
	} else if (mode == "Shooting Star 2") {
		return 26;
	} else if (mode == "Shinning") {
		return 27;
	} else if (mode == "Bouncing") {
		return 28;
	} else if (mode == "Bubbles") {
		return 30;
	} else if (mode == "StandStill") {
		return 31;
	} else if (mode == "Fog XP Style Horz") {
		return 32;
	} else if (mode == "Fog XP Style Vert") {
		return 33;
	} else if (mode == "Overlay 1") {
		return 34;
	} else if (mode == "Overlay 2") {
		return 35;
	};
	return 0;
};

//==============================
// * weather get Zindex
//==============================
Game_System.prototype.weatherGetZ = function (zindex) {
	if (zindex == "Below") {
		return 0;
	} else if (zindex == "Above") { return 2 };
	return 1;
};

//==============================
// * weather get Blend
//==============================
Game_System.prototype.weatherGetBlend = function (blend) {
	if (blend == "Additive") {
		return 1;
	} else if (blend == "Multiply") { return 2 };
	return 0;
};

//==============================
// * weather EX Sys
//==============================
Game_System.prototype.weatherEXSys = function (id, mode, power, z, blend, file, speed, scale, frames, fSpeed) {
	var id_Real = Math.abs(id)
	var speed2 = speed != null ? speed : 100;
	var scale2 = scale != null ? scale : 100;
	var frames2 = frames != null ? frames : 1;
	var fSpeed2 = fSpeed != null ? fSpeed : 4;
	this._weatherEX_Data[id_Real].mode = mode;
	this._weatherEX_Data[id_Real].power = power;
	this._weatherEX_Data[id_Real].z = z;
	this._weatherEX_Data[id_Real].blendMode = blend;
	this._weatherEX_Data[id_Real].fileName = String(file);
	this._weatherEX_Data[id_Real].speed = speed2;
	this._weatherEX_Data[id_Real].scale = scale2;
	this._weatherEX_Data[id_Real].frames = frames2;
	this._weatherEX_Data[id_Real].frameSpeed = fSpeed2;
	this._weatherEX_Data[id_Real].needRefresh = true;
	this._needRefreshWeatherEX = true;
};

//==============================
// * weather Mode
//==============================
Game_System.prototype.weatherMode = function (id) {
	if (id == null) { return 0 };
	if (this._weatherEX_Data[id] == null) { return 0 };
	return this._weatherEX_Data[id].mode;
};

//=============================================================================
// ■■■ Game Map ■■■
//=============================================================================

//==============================
// ♦ ALIAS ♦  Setup
//==============================
var _mog_weatherEX_gmap_setup = Game_Map.prototype.setup;
Game_Map.prototype.setup = function (mapId) {
	_mog_weatherEX_gmap_setup.call(this, mapId);
	if (this._mapId > 0) { this.setWeatherEX($dataMap.note) };
};

//==============================
// * Setup Weather EX
//==============================
Game_Map.prototype.setWeatherEX = function (nt) {
	var notetags = nt.split(/[\r\n]+/);
	notetags.forEach(function (note) {
		var note_data = note.split(' : ')
		if (notetags == "clear_all_weathers") {
			$gameSystem.weatherEX_initialize(true)
		} else if (note_data[0].toLowerCase() == "weather") {
			note_data.shift(); var noteR = [];
			var rd = 0; var rdi = 0;
			var maxr = note_data.length * 2
			for (var i = 0; i < maxr; i++) {
				if (rd == 0) {
					noteR.push([]); rd = 1;
				} else {
					noteR.push(note_data[rdi]);
					rd = 0; rdi++
				};
			};
			$gameSystem.commandSetupWeather(noteR);
		}
	}, this);
};

//=============================================================================
// ■■■ Spriteset Base ■■■
//=============================================================================	

//==============================
// ♦ ALIAS ♦  initialize
//==============================
var _mog_weatherEx_sprtBase = Spriteset_Base.prototype.initialize;
Spriteset_Base.prototype.initialize = function () {
	this._weatherEXSprites = [];
	_mog_weatherEx_sprtBase.call(this);
	$gameSystem._weatherSprites = null;
	$gameSystem._weatherPreData = null
};

//==============================
// * record Weather EX DataMap
//==============================
Spriteset_Base.prototype.recordWeatherEXDataMap = function () {
	for (var i = 0; i < this._weatherEXSprites.length; i++) {
		if (this._weatherEXSprites[i]) {
			this._weatherEXSprites[i].recordWeatherEXData();
		};
	};
};

//==============================
// * load Pre Weather
//==============================
Spriteset_Base.prototype.reloadWeatherEX = function () {
	for (var i = 0; i < $gameSystem._weatherEX_Data.length; i++) {
		if ($gameSystem._weatherEX_Data[i]) {
			if ($gameSystem._weatherEX_Data[i].mode >= 0) {
				this.createWeatherEX(i);
			};
			$gameSystem._weatherEX_Data[i].needRefresh = false;
		};
	};
};

//==============================
// * create Weather EX
//==============================
Spriteset_Base.prototype.createWeatherEX = function (id) {
	this._weatherEXSprites[id] = new SpriteWeatherEX(id);
	this._weatherEXSprites[id].z = id + 10;
	if ($gameSystem._weatherEX_Data[id].z === 0) {
		this._weatherField_1.addChild(this._weatherEXSprites[id]);
	} else if ($gameSystem._weatherEX_Data[id].z === 1) {
		this._weatherField_2.addChild(this._weatherEXSprites[id]);
	} else {
		this._weatherField_3.addChild(this._weatherEXSprites[id]);
	};
	this._weatherField_1.children.sort((a, b) => a.z - b.z);
	this._weatherField_2.children.sort((a, b) => a.z - b.z);
	this._weatherField_3.children.sort((a, b) => a.z - b.z);
};

//==============================
// * create Weather EX Refresh
//==============================
Spriteset_Base.prototype.createWeatherEXRefresh = function () {
	for (var i = 0; i < $gameSystem._weatherEX_Data.length; i++) {
		if ($gameSystem._weatherEX_Data[i]) {
			if (this.canCreateWeatherEX(i)) {
				this.createWeatherEX(i);
			};
			$gameSystem._weatherEX_Data[i].needRefresh = false;
		};
	};
};

//==============================
// * can Create Weather EX
//==============================
Spriteset_Base.prototype.canCreateWeatherEX = function (i) {
	if ($gameSystem._weatherEX_Data[i].mode < 0) { return false };
	if ($gameParty.inBattle()) { return true };
	if (!$gameSystem._weatherEX_Data[i].needRefresh) { return false };
	return true;
};


//==============================
// * remove Weather EX Refresh
//==============================
Spriteset_Base.prototype.removeWeatherEXRefresh = function () {
	for (var i = 0; i < $gameSystem._weatherEX_Data.length; i++) {
		if ($gameSystem._weatherEX_Data[i].needRefresh && this._weatherEXSprites[i]) {
			this._weatherField_1.removeChild(this._weatherEXSprites[i]);
			this._weatherField_2.removeChild(this._weatherEXSprites[i]);
			this._weatherEXSprites[i].clear();
			this._weatherEXSprites[i].destroy();
			this._weatherEXSprites[i] = null;
		};
	};
};

//==============================
// * create Weather Field 1
//==============================
Spriteset_Base.prototype.createWeatherField_1 = function (mode) {
	this._weatherField_1 = new Sprite();
	this._weatherField_1.z = Moghunter.weatherEX_layer1;
	this._weatherField_1.mz = this._weatherField_1.z;
	if (mode === 1 && this._battleField) {
		this._battleField.addChild(this._weatherField_1);
	} else {
		this._baseSprite.addChild(this._weatherField_1);
	};
};

//==============================
// * create Weather Field 2
//==============================
Spriteset_Base.prototype.createWeatherField_2 = function (mode) {
	this._weatherField_2 = new Sprite();
	this._weatherField_2.z = Moghunter.weatherEX_layer2;
	this._weatherField_2.mz = this._weatherField_2.z;
	if (mode === 1 && this._battleField) {
		this._battleField.addChild(this._weatherField_2);
	} else {
		this._baseSprite.addChild(this._weatherField_2);
	};
};

//==============================
// * create Weather Field 3
//==============================
Spriteset_Base.prototype.createWeatherField_3 = function (mode) {
	this._weatherField_3 = new Sprite();
	this._weatherField_3.z = Moghunter.weatherEX_layer3;
	this._weatherField_3.mz = this._weatherField_3.z;
	this._baseSprite.addChild(this._weatherField_3);
};

//==============================
// ♦ ALIAS ♦  createUpperLayer
//==============================
var _mog_weatherEX_sprtbase_createUpperLayer = Spriteset_Base.prototype.createUpperLayer;
Spriteset_Base.prototype.createUpperLayer = function () {
	_mog_weatherEX_sprtbase_createUpperLayer.call(this);
	this.createWeatherField_3();
	if (this.canReloadWeatherEX()) { this.reloadWeatherEX(); };
};

//==============================
// * Can Reload Weather EX
//==============================
Spriteset_Base.prototype.canReloadWeatherEX = function () {
	if (this._battleField && !$gameSystem._weatherEXScnBat) { return false };
	return true;
};

//==============================
// ♦ ALIAS ♦  Update
//==============================
var _mog_weatherEX_sprtbase_update = Spriteset_Base.prototype.update;
Spriteset_Base.prototype.update = function () {
	_mog_weatherEX_sprtbase_update.call(this);
	this.updateWeatherEX_Base();
	$gameSystem._weatherEX_MapId = $gameMap._mapId;
};

//==============================
// * Update Weather EX Base
//==============================
Spriteset_Base.prototype.updateWeatherEX_Base = function (id) {
	if ($gameSystem._needRefreshWeatherEX) { this.refreshWeatherEX() };
};

//==============================
// * Refresh Weather EX
//==============================
Spriteset_Base.prototype.refreshWeatherEX = function () {
	$gameSystem._needRefreshWeatherEX = false;
	this.removeWeatherEXRefresh()
	this.createWeatherEXRefresh()
};

//=============================================================================
// ■■■ Spriteset Map ■■■
//=============================================================================	

//==============================
// ♦ ALIAS ♦  create Parallax
//==============================
var _mog_weatherEx_sprtMap_createParallax = Spriteset_Map.prototype.createParallax;
Spriteset_Map.prototype.createParallax = function () {
	_mog_weatherEx_sprtMap_createParallax.call(this);
	if (!this._weatherField_1) { this.createWeatherField_1(0) };
};

//==============================
// ♦ ALIAS ♦  create TileMap
//==============================
var _mog_weatherEx_sprtMap_createTilemap = Spriteset_Map.prototype.createTilemap;
Spriteset_Map.prototype.createTilemap = function () {
	if (!this._weatherField_1) { this.createWeatherField_1(0) };
	_mog_weatherEx_sprtMap_createTilemap.call(this);
};

//==============================
// ♦ ALIAS ♦  create Lower Layer
//==============================
var _mog_weatherEx_sprtMap_createLowerLayer = Spriteset_Map.prototype.createLowerLayer;
Spriteset_Map.prototype.createLowerLayer = function () {
	_mog_weatherEx_sprtMap_createLowerLayer.call(this);
	if (!this._weatherField_2) { this.createWeatherField_2(0) };
};

//=============================================================================
// ■■■ Spriteset Battle ■■■
//=============================================================================	

//==============================
// ♦ ALIAS ♦  create BattleBack
//==============================
var _mog_weatherEx_createBattleback = Spriteset_Battle.prototype.createBattleback;
Spriteset_Battle.prototype.createBattleback = function () {
	if (!this._weatherField_1) { this.createWeatherField_1(1) };
	_mog_weatherEx_createBattleback.call(this);
};

//==============================
// ♦ ALIAS ♦  create Lower Layer
//==============================
var _mog_weatherEx_sprtBat_createLowerLayer = Spriteset_Battle.prototype.createLowerLayer;
Spriteset_Battle.prototype.createLowerLayer = function () {
	_mog_weatherEx_sprtBat_createLowerLayer.call(this);
	if (!this._weatherField_2) { this.createWeatherField_2(1) };
};

//=============================================================================
// ■■■ Scene Map ■■■
//=============================================================================

//==============================
// ♦ ALIAS ♦ snap For BattleBackground
//==============================
var _weather_ex_scMap_snapForBattleBackground = Scene_Map.prototype.snapForBattleBackground;
Scene_Map.prototype.snapForBattleBackground = function () {
	if (this.needHideWeatherforSnap(0)) { this.enableWeatherEXField(false) };
	_weather_ex_scMap_snapForBattleBackground.call(this);
	if (this.needHideWeatherforSnap(1)) { this.enableWeatherEXField(true) };
};

//==============================
// * need Hide Weather for Snap
//==============================
Scene_Map.prototype.needHideWeatherforSnap = function (mode) {
	if (!this._spriteset) { return false };
	if (!this._spriteset._weatherField_1) { return false };
	if (mode == 1) { return true };
	if (!$gameSystem._weatherEXScnBat) { return false };
	return true;
};

//==============================
// * enable Weather EX Field
//==============================
Scene_Map.prototype.enableWeatherEXField = function (enable) {
	this._spriteset._weatherField_1.visible = enable;
	this._spriteset._weatherField_2.visible = enable;
	this._spriteset._weatherField_3.visible = enable;
};

//==============================
// ♦ ALIAS ♦  Terminate
//==============================
var _mog_weatherEX_scMap_terminate = Scene_Map.prototype.terminate;
Scene_Map.prototype.terminate = function () {
	if (this._spriteset && this._spriteset._weatherField_1) { this._spriteset.recordWeatherEXDataMap() };
	_mog_weatherEX_scMap_terminate.call(this);
};

//=============================================================================
// ■■■ Scene Battle ■■■
//=============================================================================

//==============================
// ♦ ALIAS ♦  Terminate
//==============================
var _mog_weatherEX_scBat_createSpriteset = Scene_Battle.prototype.createSpriteset;
Scene_Battle.prototype.createSpriteset = function () {
	_mog_weatherEX_scBat_createSpriteset.call(this);
	$gameSystem._weatherSkipReLoad = true;
};

//==============================
//  ♦ ALIAS ♦ Terminate
//==============================
var _mog_weather_ex_scBattle_terminate = Scene_Battle.prototype.terminate;
Scene_Battle.prototype.terminate = function () {
	_mog_weather_ex_scBattle_terminate.call(this);
	if (this._spriteset && this._spriteset._weatherField_1) { this._spriteset.recordWeatherEXDataMap() };
};

//=============================================================================
// ■■■ SpriteWeatherEX ■■■
//=============================================================================
function SpriteWeatherEX() {
	this.initialize.apply(this, arguments);
};

SpriteWeatherEX.prototype = Object.create(Sprite.prototype);
SpriteWeatherEX.prototype.constructor = SpriteWeatherEX;

//==============================
// * Initialize
//==============================
SpriteWeatherEX.prototype.initialize = function (id) {
	Sprite.prototype.initialize.call(this);
	this._id = id;
	this._cam = [0, 0, false, 0, 0, 0, 0, 0, 0];
	this._modePosX = 0;
	this._screenRX = Graphics.width;
	this._screenRY = Graphics.height;
	this._camera = {};
	this._camera.limitX = 0;
	this._camera.limitY = 0;
	this._camera.randomX = 50
	this._camera.randomY = 70
	this._camera.tilingX = 0;
	this._camera.tilingY = 0;
	this._camera.bottonPos = 0;
	const gw = ((Graphics.width - 816) / 2);
	const gh = ((Graphics.height - 624) / 2);
	if (Imported.MOG_BattleCamera && $gameParty.inBattle()) {
		this._camera.limitX = (Graphics.width / 4)
		this._camera.limitY = (Graphics.height / 4);
		this._camera.randomX = 120 + gw;
		this._camera.randomY = -50 + gh;
		this._camera.bottonPos = 150 - gh;
		this._camera.tilingX = 100 - gw;
		this._camera.tilingY = -gh;
	}

	this._screenAn = Math.floor(this._screenRX / 13);
	this._speed = 0;
	this._imgChecked = false;
	this._imgData = [];
	this._camCheck = false;
	this._rot = this.data().rot;
	this.loadBitmapS();
	this.createSprites();
};

//==============================
// * record Weather EX Data
//==============================
SpriteWeatherEX.prototype.recordWeatherEXData = function () {
	if (!$gameSystem._weatherSprites) { $gameSystem._weatherSprites = [] };
	$gameSystem._weatherSprites[this._id] = [];
	for (var i = 0; i < this._sprites.length; i++) {
		var sprite = this._sprites[i];
		$gameSystem._weatherSprites[this._id][i] = {};
		$gameSystem._weatherSprites[this._id][i].idS = sprite._id;
		$gameSystem._weatherSprites[this._id][i].x = sprite.x;
		$gameSystem._weatherSprites[this._id][i].y = sprite.x;
		$gameSystem._weatherSprites[this._id][i].scaleX = sprite.scale.x;
		$gameSystem._weatherSprites[this._id][i].scaleY = sprite.scale.y;
		$gameSystem._weatherSprites[this._id][i].blendMode = sprite.blendMode;
		$gameSystem._weatherSprites[this._id][i].anchorX = sprite.anchor.x;
		$gameSystem._weatherSprites[this._id][i].anchorY = sprite.anchor.y;
		$gameSystem._weatherSprites[this._id][i].rotation = sprite.rotation;
		$gameSystem._weatherSprites[this._id][i].opacity = sprite.opacity;
		$gameSystem._weatherSprites[this._id][i].realX = sprite._realX;
		$gameSystem._weatherSprites[this._id][i].realY = sprite._realY;
		$gameSystem._weatherSprites[this._id][i].sx = sprite._sx;
		$gameSystem._weatherSprites[this._id][i].sy = sprite._sy;
		$gameSystem._weatherSprites[this._id][i].rt = sprite._rt;
		$gameSystem._weatherSprites[this._id][i].zx = sprite._zx;
		$gameSystem._weatherSprites[this._id][i].zy = sprite._zy;
		$gameSystem._weatherSprites[this._id][i].zx2 = sprite._zx2;
		$gameSystem._weatherSprites[this._id][i].zy2 = sprite._zy2;
		$gameSystem._weatherSprites[this._id][i].zp = sprite._zp;
		$gameSystem._weatherSprites[this._id][i].ani = sprite._ani;
		$gameSystem._weatherSprites[this._id][i].roll = sprite._roll;
		$gameSystem._weatherSprites[this._id][i].frames = sprite._frames
		$gameSystem._weatherSprites[this._id][i].originX = sprite.origin.x;
		$gameSystem._weatherSprites[this._id][i].originY = sprite.origin.y;
	};
};

//==============================
// * Data
//==============================
SpriteWeatherEX.prototype.data = function () {
	return $gameSystem._weatherEX_Data[this._id];
};

//==============================
// * pre Data
//==============================
SpriteWeatherEX.prototype.preData = function () {
	return $gameSystem._weatherSprites[this._id];
};

//==============================
// * Load Bitmap S
//==============================
SpriteWeatherEX.prototype.loadBitmapS = function () {
	this._image = ImageManager.loadWeather(this.data().fileName);
};

//==============================
// * Need Check Img
//==============================
SpriteWeatherEX.prototype.needCheckImg = function () {
	if (this._imgChecked) { return false };
	if (this._image.width == 0) { return false };
	return true
};

//==============================
// * Mode
//==============================
SpriteWeatherEX.prototype.mode = function () {
	return this.data().mode;
};

//==============================
// * is Animated
//==============================
SpriteWeatherEX.prototype.isAnimated = function () {
	return this.data().frames > 1;
};

//==============================
// * Clear
//==============================
SpriteWeatherEX.prototype.clear = function (id) {
	for (var i = 0; i < this._sprites.length; i++) {
		this.removeChild(this._sprites[i])
		this._sprites[i].destroy();
	};
};

//==============================
// * Check Img Par
//==============================
SpriteWeatherEX.prototype.checkImgPar = function () {
	this._imgChecked = true;
	this._imgData = [];
	this._imgData[0] = this._image.width;
	this._imgData[1] = this._image.height;
	this._imgData[2] = this._image.width / 2;
	this._imgData[3] = this._image.height / 2;
};

//==============================
// * is Tilling Weather
//==============================
SpriteWeatherEX.prototype.isTilingWeather = function () {
	if (this.mode() == 32) { return true };
	if (this.mode() == 33) { return true };
	if (this.mode() == 34) { return true };
	return false;
};

//==============================
// * Create Sprites
//==============================
SpriteWeatherEX.prototype.createSprites = function () {
	this._sprites = [];
	var power = this.data().mode >= 32 ? 1 : this.data().power;
	for (var i = 0; i < power; i++) {
		if (this.isTilingWeather()) {
			this._sprites[i] = new TilingSprite(this._image);
			this._sprites[i].tiling = true;
			this._sprites[i].needRefreshMove = false;
			this._sprites[i].move(0, 0, Graphics.width + 32, Graphics.height + 32);
			this._sprites[i].x = -16 + (Graphics.width / 2);
			this._sprites[i].y = -16 + (Graphics.height / 2);
		} else {
			this._sprites[i] = new Sprite(this._image)
		};
		this._sprites[i].z = i;
		this.setupBase(this._sprites[i], i);
		this.refreshWeather(this._sprites[i], true);
		if (this.canLoadPreData(i)) {
			this.loadPreData(this._sprites[i], this.preData()[i])
		};
		this.addChild(this._sprites[i]);
	};
	$gameSystem._weatherSkipReLoad = false;
};


//==============================
// * can load pre Data
//==============================
SpriteWeatherEX.prototype.canLoadPreData = function (i) {
	if ($gameSystem._weatherEX_MapId != $gameMap._mapId) { return false };
	if (!$gameSystem._weatherSprites) { return false };
	if (!this.preData()) { return false };
	if (!this.preData()[i]) { return false };
	if ($gameSystem._weatherSkipReLoad) { return false };
	return true
};

//==============================
// * Setup Base
//==============================
SpriteWeatherEX.prototype.setupBase = function (sprite, index) {
	sprite._id = index;
	sprite.anchor.x = 0.5;
	sprite.anchor.y = 0.5;
	sprite.blendMode = this.data().blendMode
	sprite.origin = new Point();
	sprite._realX = 0;
	sprite._realY = 0;
	sprite._sx = 0;
	sprite._sy = 0;
	sprite._rt = 0;
	sprite._op = 0;
	sprite._zx = 0;
	sprite._zy = 0;
	sprite.originX = 0;
	sprite.originY = 0;
	sprite._zp = [1.00, 1.00];
	sprite._ani = [false, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
	sprite._roll = 0;
	sprite._wait = this.data().wait;
	sprite._frames = [0, 0, 0, 0, 0];
};

//==============================
// * loadPreData
//==============================
SpriteWeatherEX.prototype.loadPreData = function (sprite, data) {
	sprite.x = data.x;
	sprite.y = data.x;
	sprite.scale.x = data.scaleX;
	sprite.scale.y = data.scaleY;
	sprite.anchor.x = data.anchorX;
	sprite.anchor.y = data.anchorY;
	sprite.blendMode = data.blendMode;
	sprite.rotation = data.rotation;
	sprite.opacity = data.opacity;
	sprite._realX = data.realX;
	sprite._realY = data.realY;
	sprite._sx = data.sx;
	sprite._sy = data.sy;
	sprite._rt = data.rt;
	sprite._zx = data.zx;
	sprite._zy = data.zy;
	sprite._zx2 = data.zx2;
	sprite._zy2 = data.zy2;
	sprite._zp = data.zp;
	sprite._ani = data.ani;
	sprite._roll = data.roll;
	sprite._frames = data.frames;
	sprite._id = data.idS;
	sprite.origin.x = data.originX;
	sprite.origin.y = data.originY;
	if (this.isTilingWeather()) { this.refreshTilingPos(sprite) };
};

//==============================
// * refreshTilingPos
//==============================
SpriteWeatherEX.prototype.refreshTilingPos = function (sprite) {
	sprite.move(0, 0, Graphics.width + 32 + this._cam[7] + this._camera.limitX, Graphics.height + 32 + this._cam[8] + this._camera.limitY);
	sprite.x = -16 + (Graphics.width / 2) - this._cam[0] + this._camera.limitX + this._camera.tilingX;
	sprite.y = -16 + (Graphics.height / 2) - this._cam[1] + this._camera.limitY + this._camera.tilingY;
};

//==============================
// * screen Y
//==============================
SpriteWeatherEX.prototype.screenX = function () {
	if (this.needFixScreen()) { return 0 };
	return $gameMap.displayX() * $gameMap.tileWidth();
};

//==============================
// * screen Y
//==============================
SpriteWeatherEX.prototype.screenY = function () {
	if (this.needFixScreen()) { return 0 };
	return $gameMap.displayY() * $gameMap.tileHeight();
};

//==============================
// * need Fix Screen
//==============================
SpriteWeatherEX.prototype.needFixScreen = function () {
	if (this.needFixScreenMode()) { return true };
	if ($gameParty.inBattle()) { return true };
	return false;
};

//==============================
// * need Fix Screen Mode
//==============================
SpriteWeatherEX.prototype.needFixScreenMode = function () {
	if (this.mode() == 21) { return true };
	return false;
};

//==============================
// * screen limit X1
//==============================
SpriteWeatherEX.prototype.screenLimitX1 = function (sprite) {
	return -(sprite.width + this._cam[0] + this._camera.limitX + 96 - this._cam[5]);
};

//==============================
// * screen limit X2
//==============================
SpriteWeatherEX.prototype.screenLimitX2 = function (sprite) {
	return (this._screenRX + sprite.width + this._cam[0] + this._camera.limitX + 96) - this._cam[7];
};

//==============================
// * screen limit Y1
//==============================
SpriteWeatherEX.prototype.screenLimitY1 = function (sprite) {
	return -(sprite.height + this._cam[1] + this._camera.limitY + 96 - this._cam[6]);
};

//==============================
// * screen limit Y2
//==============================
SpriteWeatherEX.prototype.screenLimitY2 = function (sprite) {
	return (this._screenRY + sprite.height + this._cam[1] + this._camera.limitY + 96) - this._cam[8];
};

//==============================
// * random Pos X
//==============================
SpriteWeatherEX.prototype.randomPosX = function (sprite) {
	sprite._realX = -(this._cam[0] + this._camera.randomX + this._modePosX + this._camera.limitX) + (Math.randomInt(this.screenX() + this._screenRX + 50 + this._cam[0] + this._cam[3] + (this._camera.limitX * 4)));
};

//==============================
// * random Pos Y
//==============================
SpriteWeatherEX.prototype.randomPosY = function (sprite) {
	sprite._realY = -(this._cam[1] + this._camera.randomY + this._modePosX + this._camera.limitY) + (Math.randomInt(this.screenY() + this._screenRY + 70 + this._cam[1] + this._cam[4] + (this._camera.limitY * 4)));
};

//==============================
// * center Pos X
//==============================
SpriteWeatherEX.prototype.centerPosX = function (sprite) {
	sprite._realX = -this._cam[0] + this.screenX() + (this._screenRX / 2);
};

//==============================
// * center Pos Y
//==============================
SpriteWeatherEX.prototype.centerPosY = function (sprite) {
	sprite._realY = -this._cam[1] + this.screenY() + (this._screenRY / 2);
};

//==============================
// * Need Refresh Left
//==============================
SpriteWeatherEX.prototype.needRefrehLeft = function () {
	return $gamePlayer._realX > $gamePlayer._x
};

//==============================
// * Need Refresh Right
//==============================
SpriteWeatherEX.prototype.needRefrehRight = function () {
	return $gamePlayer._realX < $gamePlayer._x
};

//==============================
// * Need Refresh Upper
//==============================
SpriteWeatherEX.prototype.needRefrehUpper = function () {
	return $gamePlayer._realY > $gamePlayer._y
};

//==============================
// * Need Refresh Bottom
//==============================
SpriteWeatherEX.prototype.needRefrehBottom = function () {
	return $gamePlayer._realY < $gamePlayer._y
};

//==============================
// * Random Refresh Left
//==============================
SpriteWeatherEX.prototype.randomRefreshLeft = function () {
	return $gamePlayer._realY < $gamePlayer._y
};

//==============================
// * random Pos Y2
//==============================
SpriteWeatherEX.prototype.randomPosY2 = function (sprite) {
	sprite._realY = -this._cam[1] + Math.randomInt(this.screenY() + this._screenRY + this._cam[1]);
};

//==============================
// * upper Pos
//==============================
SpriteWeatherEX.prototype.upperPos = function (sprite, range) {
	var rg = this._cam[1] ? this._cam[1] : range;
	this.randomPosX(sprite);
	sprite._realY = -rg + this.screenY() - (this._camera.limitY / 3);
};

//==============================
// * bottom Pos
//==============================
SpriteWeatherEX.prototype.bottomPos = function (sprite, range) {
	var rg = this._cam[1] ? this._cam[1] : range;
	this.randomPosX(sprite);
	sprite._realY = -rg + this.screenY() + this._screenRY + this._camera.limitY + this._camera.bottonPos;
};

//==============================
// * bottom Pos
//==============================
SpriteWeatherEX.prototype.bottomPos2 = function (sprite) {
	this.randomPosX(sprite);
	var sp = Math.floor(this._screenRY / 4) + this._cam[1];
	var sy = (this.screenY() + this._screenRY) - sp;
	sprite._realY = -this._cam[1] + sy + Math.randomInt(sp) + this._camera.limitY + this._camera.bottonPos;
};

//==============================
// * bottom Pos
//==============================
SpriteWeatherEX.prototype.bottomPos3 = function (sprite) {
	this.randomPosX(sprite);
	var sp = Math.floor(this._screenRY / 2) + this._cam[0];
	var sy = (this.screenY() + this._screenRY) - sp;
	sprite._realY = -this._cam[1] + sy + Math.randomInt(sp) + this._camera.limitY + this._camera.bottonPos;
};

//==============================
// * Left Pos
//==============================
SpriteWeatherEX.prototype.leftPos = function (sprite, range) {
	if (!range) { range = 0 };
	var rg = this._cam[0] ? this._cam[0] : range;
	sprite._realX = -rg + this.screenX() - this._camera.limitX;
	this.randomPosY(sprite);
};

//==============================
// * right Pos
//==============================
SpriteWeatherEX.prototype.rightPos = function (sprite, range) {
	if (!range) { range = 0 };
	var rg = this._cam[0] ? this._cam[0] : range;
	sprite._realX = -rg + this.screenX() + this._screenRX + (this._camera.limitX * 2) + (this._camera.randomX / 3);
	this.randomPosY(sprite);
};

//==============================
// * Set Pos Random
//==============================
SpriteWeatherEX.prototype.setPosRandom = function (sprite) {
	this.randomPosX(sprite);
	this.randomPosY(sprite);
};

//==============================
// * Set Pos Normal
//==============================
SpriteWeatherEX.prototype.setPosNormal = function (sprite, range, opact) {
	if (!range) { range = 0 };
	var pos = Math.randomInt(100, sprite);
	if (this.needRefrehLeft()) {
		if (pos < range) {
			this.leftPos(sprite, 40);
			if (opact) { sprite.opacity = Math.randomInt(130) + 125 };
		} else {
			this.setPosRandom(sprite);
		};
	} else if (this.needRefrehRight()) {
		if (pos < range) {
			this.rightPos(sprite, -40);
			if (opact) { sprite.opacity = Math.randomInt(130) + 125 };
		} else {
			this.setPosRandom(sprite);
		};
	} else if (this.needRefrehBottom()) {
		if (pos < range) {
			this.bottomPos(sprite, -40);
			if (opact) { sprite.opacity = Math.randomInt(130) + 125 };
		} else {
			this.setPosRandom(sprite);
		};
	} else if (this.needRefrehUpper()) {
		if (pos < range) {
			this.upperPos(sprite, 40);
			if (opact) { sprite.opacity = Math.randomInt(130) + 125 };
		} else {
			this.setPosRandom(sprite);
		};
	} else {
		this.setPosRandom(sprite);
	};
};

//==============================
// * Set Post Upper
//==============================
SpriteWeatherEX.prototype.setPosUpper = function (sprite, range) {
	if (!range) { range = 0 };
	var pos = Math.randomInt(100, sprite);
	if (this.needRefrehLeft()) {
		if (pos < range) {
			this.upperPos(sprite, 40);
		} else {
			this.leftPos(sprite, 40);
		};
	} else if (this.needRefrehRight()) {
		if (pos < range) {
			this.upperPos(sprite, 40);
		} else {
			this.rightPos(sprite, -40);
		};
	} else if (this.needRefrehBottom()) {
		if (pos < range) {
			this.upperPos(sprite, 40);
		} else {
			this.bottomPos(sprite, -40);
		};
	} else {
		this.upperPos(sprite, 40);
	};
};

//==============================
// * Set Post Upper
//==============================
SpriteWeatherEX.prototype.setPosUpper_2 = function (sprite, range) {
	if (!range) { range = 0 };
	var pos = Math.randomInt(100, sprite);
	if (this.needRefrehLeft()) {
		if (pos < range) {
			this.upperPos(sprite, 40);
		} else {
			this.leftPos(sprite, 40);
		};
	} else if (this.needRefrehRight()) {
		if (pos < range) {
			this.upperPos(sprite, 40);
		} else {
			this.rightPos(sprite, -40);
		};
	} else if (this.needRefrehBottom()) {
		if (pos < 30) {
			this.leftPos(sprite, 40);
		} else if (pos < 60) {
			this.rightPos(sprite, 40);
		} else {
			this.bottomPos(sprite, -40);
		};
	} else {
		this.upperPos(sprite, 40);
	};
};


//==============================
// * Set Post Left
//==============================
SpriteWeatherEX.prototype.setPosLeft = function (sprite) {
	var pos = Math.randomInt(100);
	if (this.needRefrehLeft()) {
		this.leftPos(sprite, 40);
	} else if (this.needRefrehRight()) {
		if (pos < 30) {
			this.rightPos(sprite, -40);
		} else {
			this.leftPos(sprite, 40)
		};
	} else if (this.needRefrehBottom()) {
		if (pos < 60) {
			this.bottomPos(sprite, -40);
		} else {
			this.leftPos(sprite, 40);
		};
	} else {
		if (pos < 60) {
			this.upperPos(sprite, 40);
		} else {
			this.leftPos(sprite, 40);
		};
	};
};

//==============================
// * Set Post Left Upper
//==============================
SpriteWeatherEX.prototype.setPosLeftUpper = function (sprite) {
	var pos = Math.randomInt(100);
	if (this.needRefrehLeft()) {
		if (pos < 40) {
			this.upperPos(sprite, 40)
		} else {
			this.leftPos(sprite, 40);
		};
	} else if (this.needRefrehRight()) {
		if (pos < 30) {
			this.upperPos(sprite, 40);
		} else if (pos < 50) {
			this.leftPos(sprite, 40);
		} else {
			this.rightPos(sprite, -40);
		};
	} else if (this.needRefrehBottom()) {
		if (pos < 30) {
			this.upperPos(sprite, 40)
		} else if (pos < 60) {
			this.leftPos(sprite, 40);
		} else {
			this.bottomPos(sprite, -40);
		};
	} else {
		if (pos < 50) {
			this.leftPos(sprite, 40)
		} else {
			this.upperPos(sprite, 40);
		};
	};
};

//==============================
// * Set Post Bottom
//==============================
SpriteWeatherEX.prototype.setPosBottom = function (sprite) {
	var pos = Math.randomInt(100);
	if (this.needRefrehLeft()) {
		if (pos < 50) {
			this.bottomPos(sprite, -40)
		} else {
			this.leftPos(sprite, 40);
		};
	} else if (this.needRefrehRight()) {
		if (pos < 30) {
			this.bottomPos(sprite, -40);
		} else if (pos < 50) {
			this.leftPos(sprite, 40);
		} else {
			this.rightPos(sprite, -40);
		};
	} else if (this.needRefrehUpper()) {
		if (pos < 50) {
			this.upperPos(sprite, 40)
		} else {
			this.bottomPos(sprite, -40);
		};
	} else {
		if (pos < 50) {
			this.leftPos(sprite, 40)
		} else {
			this.bottomPos(sprite, -40);
		};
	};
};

//==============================
// * Set Post Bottom Right
//==============================
SpriteWeatherEX.prototype.setPosBottomRight = function (sprite) {
	var pos = Math.randomInt(100);
	if (this.needRefrehLeft()) {
		if (pos < 50) {
			this.bottomPos(sprite, -40)
		} else {
			this.leftPos(sprite, 40);
		};
	} else if (this.needRefrehRight()) {
		if (pos < 30) {
			this.bottomPos(sprite, -60);
		} else if (pos < 50) {
			this.leftPos(sprite, 40);
		} else {
			this.rightPos(sprite, -60);
		};
	} else if (this.needRefrehUpper()) {
		if (pos < 50) {
			this.upperPos(sprite, 40)
		} else {
			this.bottomPos(sprite, -60);
		};
	} else {
		if (pos < 50) {
			this.rightPos(sprite, -60)
		} else {
			this.bottomPos(sprite, -60);
		};
	};
};

//==============================
// * Random Zoom
//==============================
SpriteWeatherEX.prototype.randomZoom = function (power, sprite, range) {
	var rg = range ? range : 50
	var pz = Math.randomInt(rg) * 0.01;
	sprite.scale.x = (power + pz) * this.data().scale / 100;
	sprite.scale.y = sprite.scale.x;
	sprite._zp = [sprite.scale.x, sprite.scale.y];
};

//==============================
// * need Refresh Weather
//==============================
SpriteWeatherEX.prototype.needRefreshWeather = function (sprite) {
	if (this.needFixScreenMode()) { return false };
	if (sprite.x < this.screenLimitX1(sprite)) { return true };
	if (sprite.x > this.screenLimitX2(sprite)) { return true };
	if (sprite.y < this.screenLimitY1(sprite)) { return true };
	if (sprite.y > this.screenLimitY2(sprite)) { return true };
	return false;
};

//==============================
// * need Refresh Weather
//==============================
SpriteWeatherEX.prototype.needInitialRandomPos = function () {
	if (this.mode() == 21) { return false };
	if (this.mode() == 35) { return false };
	return true;
};

//==============================
// * refresh Weather
//==============================
SpriteWeatherEX.prototype.refreshWeather = function (sprite, initial) {
	if ($gameParty.inBattle()) { this.setCamOffset(sprite) };
	switch (this.mode()) {
		case 0:
			this.setupWind1(sprite);
			break;
		case 1:
			this.setupWind2(sprite);
			break;
		case 2:
			this.setupWind3(sprite);
			break;
		case 3:
			this.setupSpark1(sprite);
			break;
		case 4:
			this.setupSpark2(sprite);
			break;
		case 5:
			this.setupSpark3(sprite);
			break;
		case 6:
			this.setupFire1(sprite);
			break;
		case 7:
			this.setupFire2(sprite);
			break;
		case 8:
			this.setupFire3(sprite);
			break;
		case 9:
			this.setupSnow1(sprite);
			break;
		case 10:
			this.setupSnow2(sprite);
			break;
		case 11:
			this.setupSnow3(sprite);
			break;
		case 12:
			this.setupRain1(sprite);
			break;
		case 13:
			this.setupRain2(sprite);
			break;
		case 14:
			this.setupRain3(sprite);
			break;
		case 15:
			this.setupCloud1(sprite);
			break;
		case 16:
			this.setupCloud2(sprite);
			break;
		case 17:
			this.setupCloud3(sprite);
			break;
		case 18:
			this.setupRandom1(sprite);
			break;
		case 19:
			this.setupRandom2(sprite);
			break;
		case 20:
			this.setupRandom3(sprite);
			break;
		case 21:
			this.setupSunLight1(sprite);
			break;
		case 22:
			this.setupFog1(sprite, initial);
			break;
		case 23:
			this.setupFog2(sprite, initial);
			break;
		case 24:
			this.setupFog3(sprite, initial);
			break;
		case 25:
			this.setupStar1(sprite, initial);
			break;
		case 26:
			this.setupStar2(sprite, initial);
			break;
		case 27:
			this.setupShinning(sprite, initial);
			break;
		case 28:
			this.setupBounce(sprite, initial);
			break;
		case 29:
			this.setupSpark4(sprite, initial);
			break;
		case 30:
			this.setupBubble(sprite, initial);
			break;
		case 31:
			this.setupStandStill(sprite, initial);
			break;
		case 32:
			this.setupFogXP1(sprite, initial);
			break;
		case 33:
			this.setupFogXP2(sprite, initial);
			break;
		case 34:
			this.setupParallax1(sprite, initial);
			break;
		case 35:
			this.setupParallax2(sprite, initial);
			break;
		default:
			this.setupRandom3(sprite);
			break;

	};
	if (initial) {
		sprite._ani[6] = 5;
		if (this.needInitialRandomPos()) { this.setPosRandom(sprite) };
		this.updateEffects(sprite)
	} else {
		if (sprite._ani[6] > 0) { sprite._ani[7] = Math.randomInt(120) };
	};
};

//==============================
// * set Cam Offset
//==============================
SpriteWeatherEX.prototype.setCamOffset = function (sprite) {
	var x = Graphics.width / 3;
	var x2 = Graphics.width / 3;
	var y = Graphics.height / 3;
	var y2 = Graphics.height / 2;
	this._cam = [x, y, false, 0, 0, 0, 0, x2, y2];
	if (this.isTilingWeather()) { this.refreshTilingPos(sprite) };
};

//==============================
// * Update Effects
//==============================
SpriteWeatherEX.prototype.updateEffects = function (sprite) {
	switch (this.mode()) {
		case 0:
			this.updateWind(sprite);
			break;
		case 1:
			this.updateWind(sprite);
			break;
		case 2:
			this.updateWind3(sprite);
			break;
		case 3:
			this.updateSpark(sprite);
			break;
		case 4:
			this.updateSpark2(sprite);
			break;
		case 5:
			this.updateSpark3(sprite);
			break;
		case 6:
			this.updateFire(sprite);
			break;
		case 7:
			this.updateFire(sprite);
			break;
		case 8:
			this.updateFire3(sprite);
			break;
		case 9:
			this.updateSnow(sprite);
			break;
		case 10:
			this.updateSnow(sprite);
			break;
		case 11:
			this.updateSnow3(sprite);
			break;
		case 12:
			this.updateRain1(sprite);
			break;
		case 13:
			this.updateRain2(sprite);
			break;
		case 14:
			this.updateRain3(sprite);
			break;
		case 15:
			this.updateCloud1(sprite);
			break;
		case 16:
			this.updateCloud2(sprite);
			break;
		case 17:
			this.updateCloud3(sprite);
			break;
		case 18:
			this.updateRandom1(sprite);
			break;
		case 19:
			this.updateRandom2(sprite);
			break;
		case 20:
			this.updateRandom3(sprite);
			break;
		case 21:
			this.updateSunLight(sprite);
			break;
		case 22:
			this.updateFog1(sprite);
			break;
		case 23:
			this.updateFog1(sprite);
			break;
		case 24:
			this.updateFog1(sprite);
			break;
		case 25:
			this.updateStar1(sprite);
			break;
		case 26:
			this.updateStar2(sprite);
			break;
		case 27:
			this.updateShinning(sprite);
			break;
		case 28:
			this.updateBounce(sprite);
			break;
		case 29:
			this.updateSpark4(sprite);
			break;
		case 30:
			this.updateBubble(sprite);
			break;
		case 31:
			this.updateStandStill(sprite);
			break;
		case 32:
			this.updateScroll(sprite);
			break;
		case 33:
			this.updateScroll(sprite);
			break;
		case 34:
			this.updateParallax1(sprite);
			break;
		case 35:
			this.updateParallax2(sprite);
			break;
		default:
			this.updateRandom1(sprite);
			break;
	};
	sprite._wait = this.data().wait;
};

//==============================
// * Setup Bounce
//==============================
SpriteWeatherEX.prototype.setupBounce = function (sprite, initial) {
	this.setPosNormal(sprite, 40);
	this.randomZoom(0.50, sprite);
	sprite.anchor.x = 0.5;
	sprite.anchor.y = 0.5;
	sprite._ani[1] = -90 - Math.randomInt(90);
	sprite._ani[2] = 0;
	sprite._ani[3] = (Math.randomInt(90) + 60) * this.speed() / 100;
	sprite._ani[5] = 0;
	sprite._ani[6] = 0;
	sprite._zx = 2
	if (initial || sprite.opacity > 0) {
		var rd = Math.randomInt(100)
		if (rd > 60) {
			sprite._ani[1] = -(Math.randomInt(100) + 20);
			sprite._ani[3] = (Math.randomInt(80))
			sprite.opacity = Math.randomInt(150) + 50;
		};
	} else {
		sprite.opacity = 0;
	};
	var rg = Math.randomInt(96) - 48;
	sprite.rotation = (rg * Math.PI / 180);
};

//==============================
// * Update Bounce
//==============================
SpriteWeatherEX.prototype.updateBounce = function (sprite) {
	sprite._ani[3]--;
	if (sprite._ani[3] <= 0) {
		sprite.opacity -= 3;
		if (sprite.opacity === 0) { this.refreshWeather(sprite) }
	} else {
		sprite.opacity += 15;
	};
	sprite._ani[2] += 0.5;
	sprite._ani[1] += sprite._ani[2];
	if (sprite._ani[1] >= 0) {
		sprite._ani[1] = 0;
		sprite._ani[2] *= -0.6;
	};
	sprite.x = sprite._realX - this.screenX();
	sprite.y = sprite._realY + Math.round(sprite._ani[1]) - this.screenY();
};

//==============================
// * Setup Wind 1
//==============================
SpriteWeatherEX.prototype.setupWind1 = function (sprite) {
	this.setPosLeftUpper(sprite);
	this.randomZoom(0.50, sprite);
	sprite.anchor.x = 0;
	sprite.anchor.y = 0;
	sprite._rt = Math.random() * 0.1;
	sprite.opacity = 0;
	sprite._sx = (this._speed + 1.5 + Math.random() * 3);
	sprite._sy = (this._speed + 1.0 + Math.random() * 3);
	sprite._roll = Math.randomInt(60);

};

//==============================
// * Update Wind
//==============================
SpriteWeatherEX.prototype.updateWind = function (sprite) {
	this.updateRollEffect(sprite);
	sprite.opacity += 25;
};

//==============================
// * Setup Wind
//==============================
SpriteWeatherEX.prototype.setupWind2 = function (sprite) {
	this.setPosLeft(sprite);
	sprite.anchor.x = -1;
	sprite.anchor.y = -1;
	sprite._rt = Math.random() * 0.1;
	this.randomZoom(0.50, sprite);
	sprite.opacity = 0;
	sprite._sx = (this._speed + 2.5 + Math.random() * 3);
	sprite._roll = Math.randomInt(60);
};

//==============================
// * Setup Wind
//==============================
SpriteWeatherEX.prototype.setupWind3 = function (sprite) {
	this.setPosRandom(sprite);
	this.randomZoom(0.50, sprite);
	sprite.opacity = 0;
	sprite.anchor.x = -1;
	sprite.anchor.y = -1;
	sprite._rt = Math.random() * 0.1;
	sprite._sx = (this._speed + 2 + Math.random() * 3);
	sprite._sy = -1
	sprite._zx = 0.01 + Math.randomInt(2) * 0.01;
	sprite._zy = sprite._zx;
	sprite._roll = Math.randomInt(60);
};


//==============================
// * Update Wind
//==============================
SpriteWeatherEX.prototype.updateWind = function (sprite) {
	this.updateRollEffect(sprite);
	sprite.opacity += 25;
};

//==============================
// * Update Wind 3
//==============================
SpriteWeatherEX.prototype.updateWind3 = function (sprite) {
	this.updateScale(sprite);
	if (sprite.scale.x < 3.0) {
		sprite.opacity += 25;
	} else {
		sprite.opacity -= 3;
		if (sprite.opacity === 0) { this.refreshWeather(sprite) }
	};
	sprite.scale.y = sprite.scale.x;
};

//==============================
// * Setup Spark 1
//==============================
SpriteWeatherEX.prototype.setupSpark1 = function (sprite) {
	this.setPosBottom(sprite);
	sprite.anchor.x = 0;
	sprite.anchor.y = 0;
	sprite._rt = Math.random() * 0.1;
	this.randomZoom(0.50, sprite);
	sprite.opacity = 0;
	sprite._sy = -(this._speed + 1.0 + Math.random() * 3);
};

//==============================
// * Update Spark
//==============================
SpriteWeatherEX.prototype.updateSpark = function (sprite) {
	sprite.opacity += 25;
};

//==============================
// * Setup Spark 2
//==============================
SpriteWeatherEX.prototype.setupSpark2 = function (sprite) {
	this.setPosNormal(sprite, 20);
	sprite.anchor.x = 0.5;
	sprite.anchor.y = 0.5;
	this.randomZoom(0.10, sprite);
	sprite.opacity = 0;
	sprite._zx = 0.01 + Math.randomInt(1) * 0.01;
	sprite._zy = this._zx;
	sprite._sy = -(this._speed + 0.5 + Math.random() * 1);
};

//==============================
// * Update Spark 2
//==============================
SpriteWeatherEX.prototype.updateSpark2 = function (sprite) {
	if (sprite.scale.x < 0.8) {
		this.updateScale(sprite);
		sprite.opacity += 25;
	} else {
		sprite.opacity -= 10;
		if (sprite.opacity === 0) { this.refreshWeather(sprite) };
	};
	sprite.scale.y = sprite.scale.x;
};


//==============================
// * Setup Spark3
//==============================
SpriteWeatherEX.prototype.setupSpark3 = function (sprite) {
	this.setPosNormal(sprite, 20);
	this.randomZoom(0.50, sprite);
	sprite._ani[0] = false;
	sprite.anchor.x = 0;
	sprite.anchor.y = 0;
	sprite.opacity = 0;
	this.refreshFireFly(sprite)
	sprite._ani[2] = sprite._ani[1] * 2;
};

//==============================
// * refresh Fire Fly
//==============================
SpriteWeatherEX.prototype.refreshFireFly = function (sprite) {
	sprite._ani[1] = Math.randomInt(60, sprite) + 60;
	var dir = Math.randomInt(2);
	var dir2 = (this._speed + 0.1 + Math.random() * 0.1);
	var dir3 = (this._speed + 0.1 + Math.random() * 0.1);
	sprite._sx = dir === 0 ? dir2 : -dir2;
	sprite._sy = dir === 0 ? dir3 : -dir3;
	sprite._rt = dir === 0 ? (Math.random() * 0.05) : -(Math.random() * 0.05);
	sprite._ani[1] = Math.randomInt(60) + 90;
};

//==============================
// * Update Spark 3
//==============================
SpriteWeatherEX.prototype.updateSpark3 = function (sprite) {
	sprite._ani[1]--;
	sprite._ani[2]--;
	if (sprite._ani[1] <= 0) { this.refreshFireFly(sprite) };
	if (sprite._ani[2] < 0) {
		sprite.opacity -= 10;
		if (sprite.opacity === 0) { this.refreshWeather(sprite) }
	} else {
		sprite.opacity += 5;
	};
};

//==============================
// * Setup Spark 4
//==============================
SpriteWeatherEX.prototype.setupSpark4 = function (sprite, initial) {
	this.setPosBottomRight(sprite);
	sprite.anchor.x = 0.5;
	sprite.anchor.y = 0;
	this.randomZoom(0.20, sprite, 150);
	var rg = Math.randomInt(360);
	sprite.rotation = (rg * Math.PI / 180);
	sprite.opacity = Math.randomInt(255);
	sprite._ani[1] = -((sprite.scale.x * 2) + (Math.randomInt(10) * 0.01)) / 3;
	sprite._ani[2] = -((sprite.scale.y * 3) + (Math.randomInt(10) * 0.01)) / 3;
	if (sprite._ani[2] < -0.3) { sprite._ani[2] = -0.3 };
	sprite._ani[3] = 9999//sprite.scale.x > 0.60 ? Math.randomInt(320) + 400 : 1200;
	sprite._ani[4] = Math.randomInt(90) + 30;
	sprite._ani[5] = 0.01;
	var rd = Math.randomInt(100);
	sprite._ani[8] = rd < 35 ? 0 : 1;
	sprite._ani[9] = sprite._ani[2];
	sprite._ani[10] = 0;
	sprite._ani[11] = 0;
	sprite._sx = sprite._ani[1];
	sprite._sy = sprite._ani[2];
};

//==============================
// * Update Spark
//==============================
SpriteWeatherEX.prototype.updateSpark4 = function (sprite) {
	if (sprite._ani[11] == 0) {
		sprite.opacity += 3;
		if (sprite.opacity >= 255) {
			sprite._ani[11] = 1;
		};
	} else {
		sprite.opacity -= 3;
		if (sprite.opacity <= 65) {
			sprite._ani[11] = 0;
		};
	};
	sprite._sx = sprite._ani[1];
	sprite._sy = sprite._ani[2];
	if (sprite._ani[4] > 0 || sprite._ani[8]) {
		sprite._ani[4]--;
		return
	};
	if (sprite._ani[10] == 0) {
		sprite._ani[2] += sprite._ani[5];
		if (sprite._ani[2] >= 0.2) {
			sprite._ani[2] = 0.2;
			sprite._ani[10] = 1;
		};
	} else {
		sprite._ani[2] -= sprite._ani[5];
		if (sprite._ani[2] <= sprite._ani[9]) {
			sprite._ani[2] = sprite._ani[9];
			sprite._ani[10] = 0;
			sprite._ani[4] = Math.randomInt(90) + 30;
		};
	};
};

//==============================
// * Setup Bubble
//==============================
SpriteWeatherEX.prototype.setupBubble = function (sprite, initial) {
	this.setPosNormal(sprite, 40);
	this.randomZoom(0.80, sprite);
	sprite.opacity = 0;
	sprite.anchor.x = 0.5;
	sprite.anchor.y = 0.5;
	sprite._zx = 0;
	sprite._zy = 0
	sprite._ani[1] = 0;
	sprite._ani[2] = Math.randomInt(5) + 20;
	sprite._ani[3] = (Math.randomInt(70) * 0.01) + 0.1;
	var rg = Math.randomInt(96) - 48;
	sprite.rotation = (rg * Math.PI / 180);
};

//==============================
// * Update Bubble
//==============================
SpriteWeatherEX.prototype.updateBubble = function (sprite) {
	this.updateScale(sprite);
	sprite._ani[2]--;
	if (sprite._ani[1] == 0) {
		sprite._sy = -sprite._ani[3] * 4;
		sprite.opacity += 15;
		if (sprite._ani[2] <= 0) {
			sprite._ani[1] = 1;
			sprite._ani[2] = (Math.randomInt(180) + 180) * this.speed() / 100;
		};
	} else if (sprite._ani[1] == 1) {
		sprite._sy = -sprite._ani[3];
		sprite.opacity += 15;
		if (sprite._ani[2] <= 0) {
			sprite._ani[1] = 2;
			sprite._zx = +(0.01 + Math.randomInt(1) * 0.01);
			sprite._zy = sprite._zx;
		}
	} else {
		sprite.opacity -= 2;
		if (sprite.opacity <= 0) {
			if (sprite.opacity === 0) { this.refreshWeather(sprite) };
		};
	};
};

//==============================
// * Setup Fire 1
//==============================
SpriteWeatherEX.prototype.setupFire1 = function (sprite) {
	var pos = Math.randomInt(100, sprite);
	if (pos < 50) {
		this.bottomPos(sprite, 30);
		sprite._sy = -(this._speed + 1.5 + Math.random() * 1);
	} else {
		this.upperPos(sprite, 30);
		sprite._sy = (this._speed + 1.5 + Math.random() * 1);
	};
	sprite.anchor.x = 0;
	sprite.anchor.y = 0;
	this.randomZoom(0.50, sprite);
	sprite.opacity = 0;
	sprite._zx = 0.01 + Math.randomInt(1) * 0.01;
	sprite._zy = sprite._zx;
	var dir = Math.randomInt(2, sprite);
	sprite._rt = dir === 0 ? (Math.random() * 0.1) : -(Math.random() * 0.1);
};

//==============================
// * Update Fire
//==============================
SpriteWeatherEX.prototype.updateFire = function (sprite) {
	if (sprite.scale.x < 1.0) {
		this.updateScale(sprite);
		sprite.opacity += 25;
	} else {
		sprite.opacity -= 15
		if (sprite.opacity === 0) { this.refreshWeather(sprite) }
	};
	sprite.scale.y = sprite.scale.x;
};

//==============================
// * Setup Fire 2
//==============================
SpriteWeatherEX.prototype.setupFire2 = function (sprite) {
	var pos = Math.randomInt(100);
	this.bottomPos2(sprite);
	sprite._sy = -(this._speed + 1.5 + Math.random() * 1);
	sprite.anchor.x = 0;
	sprite.anchor.y = 0;
	this.randomZoom(0.50, sprite);
	sprite.opacity = 0;
	sprite._zx = 0.01 + Math.randomInt(1) * 0.01;
	sprite._zy = sprite._zx;
	var dir = Math.randomInt(2);
	sprite._rt = dir === 0 ? (Math.random() * 0.1) : -(Math.random() * 0.1)
};

//==============================
// * Setup Fire 3
//==============================
SpriteWeatherEX.prototype.setupFire3 = function (sprite) {
	this.setPosNormal(sprite, 20);
	this.randomZoom(0.10, sprite);
	sprite.anchor.x = 0.5;
	sprite.anchor.y = 0.5;
	sprite.opacity = 0;
	sprite._zx = (0.1 + Math.randomInt(2) * 0.1);
	sprite._zy = sprite._zx;
	sprite._ani[1] = Math.randomInt(30);
};

//==============================
// * Update Fire 3
//==============================
SpriteWeatherEX.prototype.updateFire3 = function (sprite) {
	sprite._ani[1]--;
	if (sprite._ani[1] > 0) { return };
	this.updateScale(sprite);
	if (sprite.scale.x > 2.0) {
		sprite.opacity -= 5;
		if (sprite.opacity === 0) { this.refreshWeather(sprite) }
	} else {
		sprite.opacity += 25;
	}
};

//==============================
// * Setup Snow 1
//==============================
SpriteWeatherEX.prototype.setupSnow1 = function (sprite) {
	this.setPosUpper(sprite, 40);
	sprite.anchor.x = 0;
	sprite.anchor.y = 0;
	sprite._rt = Math.random() * 0.05;
	this.randomZoom(0.50, sprite);
	sprite.opacity = 0;
	sprite._sy = (this._speed + 1.5 + Math.random() * 2);
};

//==============================
// * Update Snow
//==============================
SpriteWeatherEX.prototype.updateSnow = function (sprite) {
	sprite.opacity += 25;
};

//==============================
// * Setup Snow 2
//==============================
SpriteWeatherEX.prototype.setupSnow2 = function (sprite) {
	this.setPosUpper_2(sprite, 10);
	sprite.anchor.x = 0;
	sprite.anchor.y = 0;
	this.randomZoom(0.50, sprite);
	sprite.opacity = 0;
	sprite._sy = (this._speed + 2 + Math.random() * 3);
	var dir = Math.randomInt(2);
	var dir2 = (this._speed + 2 + Math.random() * 3);
	sprite._sx = dir === 0 ? dir2 : -dir2;
	sprite._rt = dir === 0 ? (Math.random() * 0.1) : -(Math.random() * 0.1)
};

//==============================
// * Setup Snow 3
//==============================
SpriteWeatherEX.prototype.setupSnow3 = function (sprite) {
	if ($gamePlayer.isMoving()) {
		this.setPosUpper(sprite);
	} else {
		this.setPosRandom(sprite);
	};
	sprite.anchor.x = 0.5;
	sprite.anchor.y = 0.5;
	sprite._rt = Math.random() * 0.01;
	this.randomZoom(1.50, sprite);
	sprite._ani[1] = sprite.scale.x;
	this.randomZoom(0.01, sprite);
	sprite.opacity = 0;
	sprite._zx = (0.05 + Math.randomInt(1) * 0.01);
	sprite._zy = sprite._zx;
	sprite._sy = (this._speed + 1.5 + Math.random() * 2);
	sprite._ani[2] = sprite._sy;
	sprite._sy = 0;
};

//==============================
// * Update Snow 3
//==============================
SpriteWeatherEX.prototype.updateSnow3 = function (sprite) {
	sprite.opacity += 25;
	if (sprite.scale.x < sprite._ani[1]) {
		this.updateScale(sprite);
	} else {
		sprite._sy = sprite._ani[2];
	}
};

//==============================
// * Setup Rain 1
//==============================
SpriteWeatherEX.prototype.setupRain1 = function (sprite) {
	this.setPosUpper(sprite, 50);
	sprite.anchor.x = 0.5;
	sprite.anchor.y = 0.5;
	this.randomZoom(0.50, sprite);
	sprite.opacity = 0;
	sprite._sy = (this._speed + 5 + Math.random() * 3);
};

//==============================
// * Update Rain
//==============================
SpriteWeatherEX.prototype.updateRain1 = function (sprite) {
	sprite.opacity += 25;
};

//==============================
// * Setup Rain 2
//==============================
SpriteWeatherEX.prototype.setupRain2 = function (sprite) {
	this.randomPosX(sprite);
	this.randomPosY(sprite);
	sprite.anchor.x = 0.5;
	sprite.anchor.y = 0.5;
	this.randomZoom(0.50, sprite);
	sprite.opacity = 0;
	sprite._zx = 0.2;
	sprite._zy = sprite._zx;
	sprite._sy = (this._speed + 5 + Math.random() * 3);
	sprite._ani[1] = Math.randomInt(30);
};

//==============================
// * Update Rain 2
//==============================
SpriteWeatherEX.prototype.updateRain2 = function (sprite) {
	sprite.opacity += 25;
	sprite._ani[1]--;
	if (sprite._ani[1] <= 0) {
		this.updateScale(sprite);
		sprite._sy = 0;
		sprite.opacity -= 75
		if (sprite.opacity === 0) { this.refreshWeather(sprite) }
	};
};

//==============================
// * Setup Rain 3
//==============================
SpriteWeatherEX.prototype.setupRain3 = function (sprite) {
	var pos = Math.randomInt(100);
	if (pos < 50) {
		this.upperPos(sprite);
	} else {
		this.randomPosX(sprite);
		this.randomPosY(sprite);
	};
	sprite.anchor.x = 0.5;
	sprite.anchor.y = 0.5;
	this.randomZoom(0.50, sprite);
	sprite._ani[1] = sprite.scale.x;
	this.randomZoom(5.50, sprite);
	sprite.opacity = 0;
	sprite._sx = (this._speed + 3 + Math.random() * 3);
	sprite._sy = (this._speed + 6 + Math.random() * 4);
	sprite._zx = -(0.1 + Math.randomInt(1) * 0.05);
	sprite._zy = sprite._zx;
};

//==============================
// * Update Rain 3
//==============================
SpriteWeatherEX.prototype.updateRain3 = function (sprite) {
	sprite.opacity += 25;
	this.updateScale(sprite);
	if (sprite.scale.x <= 0.10) { this.refreshWeather(sprite) }
};

//==============================
// * Setup Cloud 1
//==============================
SpriteWeatherEX.prototype.setupCloud1 = function (sprite) {
	this.setPosNormal(sprite, 20);
	sprite.anchor.x = 0.5;
	sprite.anchor.y = 0.5;
	this.randomZoom(0.50, sprite);
	sprite.opacity = 0;
	sprite._sx = (this._speed + 1 + Math.random() * 2);
};

//==============================
// * Update Cloud 1
//==============================
SpriteWeatherEX.prototype.updateCloud1 = function (sprite) {
	sprite.opacity += 5;
};

//==============================
// * Setup Cloud 2
//==============================
SpriteWeatherEX.prototype.setupCloud2 = function (sprite) {
	this.setPosNormal(sprite, 20);
	sprite.anchor.x = 0.5;
	sprite.anchor.y = 0.5;
	this.randomZoom(0.10, sprite);
	sprite.opacity = 0;
	sprite._zx = 0.01 + Math.randomInt(1) * 0.01;
	sprite._zy = sprite._zx;
	sprite._sy = (this._speed + 1.5 + Math.random() * 2.5);
};

//==============================
// * Update Cloud 2
//==============================
SpriteWeatherEX.prototype.updateCloud2 = function (sprite) {
	this.updateScale(sprite);
	if (sprite.scale.x < 1.5) {
		sprite.opacity += 5;
	} else {
		sprite.opacity -= 5
		if (sprite.opacity === 0) { this.refreshWeather(sprite) }
	};
};

//==============================
// * Setup Cloud 3
//==============================
SpriteWeatherEX.prototype.setupCloud3 = function (sprite) {
	var dir = Math.randomInt(3);
	sprite._ani[1] = dir;
	if (dir === 0) {
		this.leftPos(sprite, 30);
		this.randomZoom(0.50, sprite);
		sprite._ani[0] = false;
		sprite._sx = (this._speed + 5 + Math.random() * 5);
	} else if (dir === 1) {
		this.leftPos(sprite, 30);
		this.randomZoom(1.00, sprite);
		sprite._ani[0] = false;
		sprite._sx = (this._speed + 10 + Math.random() * 5);
	} else {
		this.leftPos(sprite, 30);
		this.randomZoom(1.50, sprite);
		sprite._ani[0] = true;
		sprite._sx = (this._speed + 15 + Math.random() * 5);
	};
	sprite._zx = -(0.02 + Math.randomInt(1) * 0.01);
	sprite._zy = sprite._zx;
	sprite.anchor.x = 0.5;
	sprite.anchor.y = 0.5;
	sprite.opacity = 0;
};

//==============================
// * Update Cloud 3
//==============================
SpriteWeatherEX.prototype.updateCloud3 = function (sprite) {
	sprite.opacity += 25
};

//==============================
// * Setup Random
//==============================
SpriteWeatherEX.prototype.setupRandom1 = function (sprite) {
	this.setPosNormal(sprite, 20);
	var dir = Math.randomInt(2);
	var sx = (this._speed + 5 + Math.random() * 3);
	this._sx = dir === 0 ? sx : -sx;
	var dir = Math.randomInt(2);
	var sy = (this._speed + 5 + Math.random() * 3);
	sprite._sy = dir === 0 ? sy : -sy;
	sprite.anchor.x = 0.5;
	sprite.anchor.y = 0.5;
	sprite.opacity = 0;
};

//==============================
// * Update Random
//==============================
SpriteWeatherEX.prototype.updateRandom1 = function (sprite) {
	sprite.opacity += 25;
};

//==============================
// * Setup Random 2
//==============================
SpriteWeatherEX.prototype.setupRandom2 = function (sprite) {
	var dir = Math.randomInt(2);
	if (dir === 0) {
		sprite._sx = (this._speed + 5 + Math.random() * 3);
		sprite._sy = -(this._speed + 1 + Math.random() * 3);
	} else {
		sprite._sx = -(this._speed + 5 + Math.random() * 3);
		sprite._sy = (this._speed + 1 + Math.random() * 3);
	};
	this.randomZoom(0.50, sprite);
	this.setPosNormal(sprite, 20);
	sprite.anchor.x = -1;
	sprite.anchor.y = 1;
	sprite._rt = Math.randomInt(10) * 0.01;
	sprite._zx = 0.02 + Math.randomInt(1) * 0.02;
	sprite._zy = sprite._zx;
	sprite.opacity = 0;
};

//==============================
// * Update Random 2
//==============================
SpriteWeatherEX.prototype.updateRandom2 = function (sprite) {
	sprite.opacity += 25;
	this.updateScale(sprite);
};

//==============================
// * Setup Random 3
//==============================
SpriteWeatherEX.prototype.setupRandom3 = function (sprite) {
	var dir = Math.randomInt(2);
	if (dir === 0) {
		this.leftPos(sprite, 30);
		this.randomZoom(0.50, sprite);
		sprite._sx = (this._speed + 4 + Math.random() * 3);
		sprite._sy = -(this._speed + 0.1 + Math.random() * 0.5);
	} else {
		this.rightPos(sprite, 30);
		this.randomZoom(1.50, sprite);
		sprite._sx = -(this._speed + 5 + Math.random() * 3);
		sprite._sy = (this._speed + 1 + Math.random() * 3);
	};
	sprite.anchor.x = 0.5;
	sprite.anchor.y = 0.5;
	sprite.opacity = 0;
};

//==============================
// * Update Random3
//==============================
SpriteWeatherEX.prototype.updateRandom3 = function (sprite) {
	sprite.opacity += 25
};

//==============================
// * Setup Fog 1
//==============================
SpriteWeatherEX.prototype.setupFog1 = function (sprite, initial) {
	sprite.opacity = 0;
	var dir = Math.randomInt(100);
	if (dir < 80) {
		this.setPosNormal(sprite, 20, true);
	} else {
		this.setPosLeft(sprite, 20);
	};
	sprite.anchor.x = 0;
	sprite.anchor.y = 1;
	this.randomZoom(0.50, sprite);
	var spd = (0.5 + Math.random() * 0.8)
	var dir = Math.randomInt(2)
	sprite._sx = dir == 0 ? spd : -spd;
	sprite._ani[1] = Math.randomInt(10) + 10;
	sprite._ani[2] = Math.randomInt(2) + 2;
	sprite._ani[3] = 0;
	sprite._ani[4] = 5;
	sprite._ani[5] = Math.randomInt(2) + 1;
	sprite._rt = 0;
	if (dir === 0) {
		sprite._zx = 0.004;
		sprite._zy = 0.003;
	} else {
		sprite.scale.x = -sprite.scale.x
		sprite._zx = -0.004;
		sprite._zy = 0.003;
	};
};

//==============================
// * Setup Fog 2
//==============================
SpriteWeatherEX.prototype.setupFog2 = function (sprite, initial) {
	sprite.opacity = 0;
	this.setPosNormal(sprite, 20, true);
	sprite.anchor.x = 0.5;
	sprite.anchor.y = 1;
	this.randomZoom(0.80, sprite, 20);
	var rg = Math.randomInt(16) - 8;
	sprite.rotation = (rg * Math.PI / 180);
	sprite._sx = 0;
	sprite._ani[1] = Math.randomInt(120) + 10;
	sprite._ani[2] = Math.randomInt(2) + 2;
	sprite._ani[3] = 0;
	sprite._ani[4] = 50;
	sprite._ani[5] = 2;
	sprite._ani[7] = Math.randomInt(100) * 0.0001;
	sprite._rt = 0;
	sprite._zx = 0.012 + Math.randomInt(100) * 0.0001;
	sprite._zy = 0.012 + Math.randomInt(100) * 0.0001;
	if (sprite.opacity > 0) {
		sprite._ani[1] = 0;
	} else if (initial) {
		var rd = Math.randomInt(100)
		if (rd > 60) {
			sprite._ani[1] = 0;
			sprite.opacity = Math.randomInt(150) + 50;
		};
	};
};

//==============================
// * Setup Fog 3
//==============================
SpriteWeatherEX.prototype.setupFog3 = function (sprite, initial) {
	this.setPosNormal(sprite, 20, true);
	sprite.anchor.x = 0;
	sprite.anchor.y = 0.5;
	this.randomZoom(0.50, sprite);
	sprite.opacity = 0;
	var rg = Math.randomInt(16) - 8;
	sprite.rotation = 0;
	sprite._sx = (0.5 + Math.random() * 0.8);;
	sprite._ani[1] = Math.randomInt(80) + 10;
	sprite._ani[2] = Math.randomInt(2) + 2;
	sprite._ani[3] = 0;
	sprite._ani[4] = 50;
	sprite._ani[5] = 10;
	sprite._rt = 0;
	sprite._zx = 0.1;
	sprite._zy = -0.04;
	sprite.scale.x = 1.00;
	sprite.scale.y = sprite.scale.x;
	if (initial) {
		var rd = Math.randomInt(100)
		if (rd > 60) {
			sprite._ani[1] = 0;
			sprite.opacity = Math.randomInt(150) + 50;
		};
	};
};

//==============================
// * Update Fog 1
//==============================
SpriteWeatherEX.prototype.updateFog1 = function (sprite) {
	if (sprite._ani[1] > 0) {
		sprite._ani[1]--;
		return;
	};
	if (sprite._ani[3] == 0) {
		sprite.opacity += sprite._ani[4];
		if (sprite.opacity >= 255) { sprite._ani[3] = 1 };
	} else if (sprite._ani[3] == 1) {
		sprite._ani[1]--;
		if (sprite._ani[1] <= 0) { sprite._ani[3] = 2 };
	} else {
		sprite.opacity -= sprite._ani[5];
		this.updateScale(sprite);
		if (sprite.opacity <= 0) { this.refreshWeather(sprite) };
	};
};

//==============================
// * Setup Fog XP 1
//==============================
SpriteWeatherEX.prototype.setupFogXP1 = function (sprite, initial) {
	sprite._ani[1] = (this._speed + 0.1 + Math.random() * 2) * this.speed() / 100;
	sprite._ani[2] = 0;
	sprite._sy = Math.randomInt(100);
};

//==============================
// * Setup Fog XP 2
//==============================
SpriteWeatherEX.prototype.setupFogXP2 = function (sprite, initial) {
	sprite._ani[1] = 0;
	sprite._ani[2] = (this._speed + 0.1 + Math.random() * 2) * this.speed() / 100;
	sprite._sy = Math.randomInt(100);
};

//==============================
// * Update Fog 5
//==============================
SpriteWeatherEX.prototype.updateScroll = function (sprite) {
	sprite._sx -= sprite._ani[1];
	sprite._sy -= sprite._ani[2];
	sprite.origin.x = $gameMap.displayX() * $gameMap.tileWidth() + sprite._sx;
	sprite.origin.y = $gameMap.displayY() * $gameMap.tileHeight() + sprite._sy;
};

//==============================
// * Setup Parallax 1
//==============================
SpriteWeatherEX.prototype.setupParallax1 = function (sprite, initial) {
	sprite._sx = 1 * this.speed() / 100;
	sprite._sy = 1 * this.speed() / 100;
	sprite.move(0, 0, Graphics.width + 32, Graphics.height + 32);
	sprite.x = -16 + (Graphics.width / 2);
	sprite.y = -16 + (Graphics.height / 2);
};

//==============================
// * Update Parallax 1
//==============================
SpriteWeatherEX.prototype.updateParallax1 = function (sprite) {
	sprite.origin.x = this._imgData[2] + (this.screenX() / sprite._sx);
	sprite.origin.y = this._imgData[3] + (this.screenY() / sprite._sy);
};

//==============================
// * Setup Parallax 2
//==============================
SpriteWeatherEX.prototype.setupParallax2 = function (sprite, initial) {
	sprite.anchor.x = 0.0;
	sprite.anchor.y = 0.0;
	sprite._realX = 0;
	sprite._realY = 0;
	sprite._sx = 1 * this.speed() / 100;
	sprite._sy = 1 * this.speed() / 100;
	sprite.opacity = 255;
};

//==============================
// * Update Parallax 2
//==============================
SpriteWeatherEX.prototype.updateParallax2 = function (sprite) {
	sprite.x = sprite._realX - (this.screenX() / sprite._sx);
	sprite.y = sprite._realY - (this.screenY() / sprite._sy);
};

//==============================
// * Setup SunLight 1
//==============================
SpriteWeatherEX.prototype.setupSunLight1 = function (sprite) {
	this._modePosX = 90;
	this.randomZoom(0.50, sprite, 50);
	var pos = Math.randomInt(100);
	if (pos < 50) {
		this.leftPos(sprite, 96);
	} else {
		this.randomPosX(sprite);
		sprite._realY = - (128 + this._camera.limitY + this._camera.randomY);
	};
	sprite.anchor.x = 0;
	sprite.anchor.y = 0;
	var rg = Math.randomInt(2) + 44
	sprite.rotation = (rg * Math.PI / 180);
	sprite.opacity = 0;
	sprite._ani[1] = Math.randomInt(120) + 10;
	sprite._ani[2] = Math.randomInt(2) + 2;
	sprite._ani[3] = 0;
	sprite._ani[4] = 0;
	sprite._ani[5] = 0;
	sprite._ani[9] = sprite._realX;
	sprite._ani[10] = sprite._realY;
};

//==============================
// * Update Sun Light
//==============================
SpriteWeatherEX.prototype.updateSunLight = function (sprite) {
	if (sprite._ani[1] > 0) {
		sprite._ani[1]--;
		return;
	};
	sprite._ani[5]++;
	if (sprite._ani[5] > 15) {
		sprite._ani[5] = 0;
		sprite._realX = sprite._ani[9] + Math.randomInt(2) - 1
	}
	if (sprite._ani[3] === 0) {
		sprite.opacity += sprite._ani[2];
		if (sprite.opacity >= 255) {
			sprite._ani[3] = 1;
			sprite._ani[4] = (Math.randomInt(180) + 120) * this.speed() / 100;
		};
	} else if (sprite._ani[3] === 1) {
		sprite._ani[4]--;
		if (sprite._ani[4] <= 0) { sprite._ani[3] = 2 };
	} else if (sprite._ani[3] === 2) {
		sprite.opacity -= sprite._ani[2];
		if (sprite.opacity <= 0) { this.refreshWeather(sprite) };
	};
};

//==============================
// * Setup Star 1
//==============================
SpriteWeatherEX.prototype.setupStar1 = function (sprite) {
	this.setPosLeftUpper(sprite);
	this.randomZoom(0.20, sprite, 80);
	sprite.anchor.x = 0.5;
	sprite.anchor.y = 0.5;
	sprite._ani[1] = Math.randomInt(2);
	sprite.opacity = Math.randomInt(150) + 100;
	sprite._sx = (sprite.scale.x * 3);
	sprite._sy = (sprite.scale.y * 3);
};

//==============================
// * Update Star 1
//==============================
SpriteWeatherEX.prototype.updateStar1 = function (sprite) {
	if (sprite._ani[1] == 0) {
		sprite.opacity -= 15;
		if (sprite.opacity < 125) { sprite._ani[1] = 1 };
	} else {
		sprite.opacity += 15;
		if (sprite.opacity >= 255) { sprite._ani[1] = 0 };
	};
};

//==============================
// * Setup Star 2
//==============================
SpriteWeatherEX.prototype.setupStar2 = function (sprite) {
	this.setPosLeftUpper(sprite);
	this.randomZoom(0.20, sprite, 80);
	sprite.anchor.x = 0.5;
	sprite.anchor.y = 0.5;
	sprite._ani[1] = Math.randomInt(2);
	sprite.opacity = Math.randomInt(150) + 100;
	sprite._sx = (sprite.scale.x * 3);
	sprite._sy = (sprite.scale.y * 3);
	sprite._rt = Math.random() * 0.1;
};

//==============================
// * Setut Shinning
//==============================
SpriteWeatherEX.prototype.setupShinning = function (sprite, initial) {
	this.setPosNormal(sprite, 40, true);
	this.randomZoom(0.10, sprite, 90);
	sprite.anchor.x = 0.5;
	sprite.anchor.y = 0.5;
	sprite._ani[0] = false
	sprite._ani[1] = Math.randomInt(2);
	sprite._ani[4] = Math.randomInt(60)
	if (sprite.opacity > 0 && !initial) {
		sprite._ani[4] = Math.randomInt(20)
	}
	else {
		if (initial) {
			sprite.opacity = 0;
		} else {
			sprite.opacity = Math.randomInt(50);
		};
	};
	sprite._ani[3] = (Math.randomInt(180) + 30) * this.speed() / 100;
	var rg = Math.randomInt(360);
	sprite.rotation = (rg * Math.PI / 180);
};

//==============================
// * Update Star 1
//==============================
SpriteWeatherEX.prototype.updateShinning = function (sprite) {
	if (sprite._ani[4] > 0) {
		sprite._ani[4]--;
		sprite.visible = false;
		return
	};
	sprite.visible = true;
	if (!sprite._ani[0]) {
		sprite.opacity += 4;
		if (sprite.opacity >= 255) { sprite._ani[0] = true };
	} else {
		if (sprite._ani[3] > 0) {
			sprite._ani[3]--;
			if (sprite._ani[1] == 0) {
				sprite.opacity -= 15;
				if (sprite.opacity < 125) { sprite._ani[1] = 1 };
			} else {
				sprite.opacity += 15;
				if (sprite.opacity >= 255) { sprite._ani[1] = 0 };
			};
		} else {
			sprite.opacity -= 4;
			if (sprite.opacity <= 0) { this.refreshWeather(sprite) };
		};

	};
};

//==============================
// * Setup Shinning
//==============================
SpriteWeatherEX.prototype.setupStandStill = function (sprite, initial) {
	this.setPosNormal(sprite, 40, true);
	this.randomZoom(0.40, sprite, 80);
	sprite.anchor.x = 0.5;
	sprite.anchor.y = 0.5;
	if (initial) {
		sprite.opacity = Math.randomInt(100) + 155;
	} else {
		sprite.opacity = 0;
	}
	sprite._ani[2] = (sprite.scale.x * 4);
	var rg = Math.randomInt(360);
	sprite.rotation = (rg * Math.PI / 180);
	sprite._sx = (sprite.scale.x * 3);
	sprite._sy = (sprite.scale.y * 3);
	if (this.speed() != 100) {
		sprite._zx = (sprite._sx / 4) * this.speed() / 100
		sprite._zy = (sprite._sy / 4) * this.speed() / 100;
	};
};

//==============================
// * Update Star 1
//==============================
SpriteWeatherEX.prototype.updateStandStill = function (sprite) {
	sprite.opacity += 10;
	sprite._realX += sprite._zx;
	sprite._realY += sprite._zy;
	sprite.x = sprite._realX - this.screenX() / sprite._ani[2];
	sprite.y = sprite._realY - this.screenY() / sprite._ani[2];
};


//==============================
// * Update Star 2
//==============================
SpriteWeatherEX.prototype.updateStar2 = function (sprite) {
	sprite.opacity += 25;
};

//==============================
// * Update Random3
//==============================
SpriteWeatherEX.prototype.speed = function () {
	return this.data().speed;
};

//==============================
// * need Update Position
//==============================
SpriteWeatherEX.prototype.needUpdatePosition = function () {
	if (this.mode() === 28) { return false };
	if (this.mode() === 31) { return false };
	if (this.mode() === 32) { return false };
	if (this.mode() === 33) { return false };
	if (this.mode() === 34) { return false };
	if (this.mode() === 35) { return false };
	return true;
};

//==============================
// * Update Position
//==============================
SpriteWeatherEX.prototype.updatePosition = function (sprite) {
	sprite._realX += sprite._sx * this.speed() / 100;
	sprite._realY += sprite._sy * this.speed() / 100;
	sprite.x = sprite._realX - this.screenX();
	sprite.y = sprite._realY - this.screenY();
};

//==============================
// * Update Other
//==============================
SpriteWeatherEX.prototype.updateOther = function (sprite) {
	sprite.rotation += sprite._rt * this.speed() / 100;
	sprite.opacity += sprite._op;
};

//==============================
// * Update Scale
//==============================
SpriteWeatherEX.prototype.updateScale = function (sprite) {
	sprite.scale.x += sprite._zx * this.speed() / 100;
	sprite.scale.y += sprite._zy * this.speed() / 100;
};

//==============================
// * Update Wind
//==============================
SpriteWeatherEX.prototype.updateRollEffect = function (sprite) {
	sprite._roll--;
	if (sprite._roll <= 0) {
		if (sprite.scale.x > -sprite._zp[0]) {
			sprite.scale.x -= 0.02 * this.speed() / 100;
		};
	};
};

//==============================
// * get Anime Data
//==============================
SpriteWeatherEX.prototype.getAnimeData = function (sprite) {
	sprite._frames[0] = Math.randomInt(this.data().frameSpeed);
	sprite._frames[1] = Math.randomInt(this.data().frames);
	sprite._frames[2] = this.data().frameSpeed;
	sprite._frames[3] = this._image.width / this.data().frames;
	sprite._frames[4] = this._image.height;
	this.refreshFrames(sprite);
};

//==============================
// * Update Anime
//==============================
SpriteWeatherEX.prototype.updateAnime = function (sprite) {
	sprite._frames[0]++;
	if (sprite._frames[0] >= sprite._frames[2]) {
		sprite._frames[0] = 0;
		sprite._frames[1]++;
		if (sprite._frames[1] >= this.data().frames) { sprite._frames[1] = 0 };
		this.refreshFrames(sprite);
	};
};

//==============================
// * refresh Frames
//==============================
SpriteWeatherEX.prototype.refreshFrames = function (sprite) {
	var cw = sprite._frames[3];
	var ch = sprite._frames[4];
	var wd = cw * sprite._frames[1];
	sprite.setFrame(wd, 0, cw, ch);
};

//==============================
// * forceHideWeatherBattle
//==============================
SpriteWeatherEX.prototype.forceHideWeatherBattle = function () {
	if (!$gameParty.inBattle()) { return false };
	if (this.data().mode == 34) { return true };
	if (this.data().mode == 35) { return true };
	return false;
};

//==============================
// * forceHideWeather
//==============================
SpriteWeatherEX.prototype.forceHideWeather = function () {
	if (this.data().mode < 0) { return true };
	if (this.forceHideWeatherBattle()) { return true };
	return false;
};

//==============================
// * Update
//==============================
SpriteWeatherEX.prototype.update = function () {
	Sprite.prototype.update.call(this);
	if (this.forceHideWeather()) {
		this.visible = false;
		return;
	};
	if (!this._camCheck && $gameParty.inBattle()) {
		this._camCheck = true;
		for (var i = 0; i < this._sprites.length; i++) {
			this.refreshWeather(this._sprites[i], true);
		};
	};
	if (this.needCheckImg()) { this.checkImgPar() };
	for (var i = 0; i < this._sprites.length; i++) {
		this.updateSprites(this._sprites[i]);
	};
};

//==============================
// * Update Sprites
//==============================
SpriteWeatherEX.prototype.updateSprites = function (sprite) {
	if (this.isAnimated() && sprite._frames[3] == 0) { this.getAnimeData(sprite) }
	if (sprite._ani[6] > 0) { sprite._ani[6]-- };
	if (sprite._ani[7] > 0) {
		sprite.visible = false;
		sprite._ani[7]--
		return;
	};
	sprite.visible = true;
	this.updateEffects(sprite)
	if (this.needUpdatePosition()) { this.updatePosition(sprite) };
	this.updateOther(sprite);
	if (this.isAnimated() && sprite._frames[3] > 0) { this.updateAnime(sprite) }
	if (this.needRefreshWeather(sprite)) { this.refreshWeather(sprite, false) };
};
