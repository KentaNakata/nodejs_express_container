//=============================================================================
// RIKU_MultiSoundPlayer.js
// ----------------------------------------------------------------------------
// Copyright (c) 2017 n2naokun(柊菜緒)
// This software is released under the MIT License.
// http://opensource.org/licenses/mit-license.php
// ----------------------------------------------------------------------------
// Version
// 1.2.0 2018/07/02 パンとピッチの設定に対応(旧バージョンとの互換有り)
// 1.1.1 2017/10/28 競合が発生する可能性のあるバグを修正
// 1.1.0 2017/10/22 事前読み込みに対応しました
// 1.0.0 2017/10/22 初版
// ----------------------------------------------------------------------------
// [Twitter]: https://twitter.com/n2naokun/
// [GitHub] : https://github.com/n2naokun/
//=============================================================================

/*:
 * @plugindesc 通常のBGMやBGSとは別に複数のサウンドを同時再生するプラグイン
 * @target MZ
 * @author n2naokun(柊菜緒)
 *
 * @help 使い方
 * 
 * ◆サウンドを事前読み込みする場合
 * プラグインコマンドから「BGMの読み込み」または「BGSの読み込み」を選択し、
 * 下記項目を設定します。
 * 　・再生識別子（SoundID）を設定
 * 　・bgm/bgsフォルダ内の、読み込みを行うファイルを選択
 * 　・音量を設定（最大値は100）
 * 
 * 音量は省略出来ます。省略した場合は100%に設定されます。
 * 「サウンドの読み込み」であらかじめ読み込んでいた場合、「サウンドの再生」で
 * 再生識別子を指定するだけで再生できます。
 * 
 * ※再生識別子（SoundID）とは
 *  再生中のサウンド自体に付ける名前です。
 *  これがあることによって同じ名前のファイルも同時再生ができます。
 * 
 * ◆読み込みデータを削除する場合
 * プラグインコマンドから「サウンドの消去」を選択し、再生識別子を設定します。
 * 「サウンドの停止」を使用した場合でもメモリー上にデータを残し続けるので
 * 使用しなくなった場合「サウンドの消去」を実行することをおすすめします。
 * 「サウンドの停止」を実行せずに「サウンドの消去」を実行することもできます。
 * 
 * ◆再生する場合
 * プラグインコマンドから「サウンドの再生」を選択し、下記項目を設定してください。
 * 　・再生識別子（SoundID）を設定
 * 　・bgm/bgsフォルダ内の、読み込みを行うファイルを選択
 * 　・音量を設定（最大値は100）
 * 事前読み込みせずにここで読み込むこともできます。
 * 事前読み込みされていた場合は再生識別子以外のパラメーターは無視されます。
 * 音量は省略出来ます。省略した場合は100%に設定されます。
 * ピッチとパンは固定です。
 * 
 * ◆音量を変える場合
 * プラグインコマンドから「サウンドの音量」を選択し、再生識別子と音量を設定します。
 * 再生識別子で指定したサウンドの音量を変更します。
 * 
 * ◆パン（位相）を変える場合
 * プラグインコマンドから「サウンドのパン」を選択し、再生識別子とパンの値を設定します。
 * 
 * ◆ピッチを変える場合
 * プラグインコマンドから「サウンドのピッチ」を選択し、
 * 再生識別子とピッチ（ツクールよりも広範囲に設定可能）を設定します。
 * 
 * ※あまり極端な値にすると動作の保証ができません（笑）
 *  また、再生中に変更すると最初から再生しなおされます。　
 *  「サウンドの読み込み」と「サウンドの再生」の間で変更した方が精神衛生上安全でしょう。
 * 
 * ◆停止する場合
 * プラグインコマンドから「サウンドの停止」を選択し、再生識別子を設定してください。
 * 
 * ※停止しただけでは読み込んだデータは消去されません。
 *  使用しない場合は「サウンドの消去」を使用してください。
 * 
 * ※指定したファイルが存在しないとエラーが発生します。
 * 
 * 
 * 利用規約：
 *  作者に無断で改変、再配布が可能で、利用形態（商用、18禁利用等）
 *  についても制限はありません。
 *  このプラグインはもうあなたのものです。
 * 
 * ------------------------------------------------------------------------
 * 2020/09/03　RPGツクールMZ v1.0.1 で動作するよう、リクドウによって改変。
 * プラグインヘルプの内容も、改変に合わせて一部の記述を変更しています。
 * 
 * 
 * 
 * @command SetBgm
 * @text BGMの読み込み
 * @desc BGMデータの事前読み込みを行います。
 * 
 * @arg soundId
 * @text 再生識別子
 * @desc サウンドを識別するために付ける名前
 * @default 
 * 
 * @arg soundName
 * @text サウンドファイル名
 * @desc bgmフォルダからファイルを指定
 * @type file
 * @dir audio/bgm/
 * 
 * @arg volume
 * @text 音量
 * @desc サウンドの音量（最小値 0　最大値 100）
 * @type number
 * @min 0
 * @max 100
 * @default 100
 * 
 * @command SetBgs
 * @text BGSの読み込み
 * @desc BGSデータの事前読み込みを行います。
 * 
 * @arg soundId
 * @text 再生識別子
 * @desc サウンドを識別するために付ける名前
 * @default 
 * 
 * @arg soundName
 * @text サウンドファイル名
 * @desc bgsフォルダからファイルを指定
 * @type file
 * @dir audio/bgs/
 * 
 * @arg volume
 * @text 音量
 * @desc サウンドの音量（最小値 0　最大値 100）
 * @type number
 * @min 0
 * @max 100
 * @default 100
 * 
 * @command DelSound
 * @text サウンドの消去
 * @desc 読み込んだサウンドデータを消去します。
 * 
 * @arg soundId
 * @text 再生識別子
 * @desc サウンドを識別するために設定した名前
 * @default
 * 
 * @command SoundVolume
 * @text サウンドの音量変更
 * @desc サウンドの音量を変更します。
 * 
 * @arg soundId
 * @text 再生識別子
 * @desc サウンドを識別するために設定した名前
 * @default
 * 
 * @arg volume
 * @text 音量
 * @desc サウンドの音量（最小値 0　最大値 100）
 * @type number
 * @min 0
 * @max 100
 * @default 90
 * 
 * @command SoundPan
 * @text サウンドのパン（位相）変更
 * @desc サウンドのパン（位相）を変更します。
 * 
 * @arg soundId
 * @text 再生識別子
 * @desc サウンドを識別するために設定した名前
 * @default
 * 
 * @arg soundPan
 * @text パン（位相）
 * @desc パン（位相）の値を設定（-100 ～ 100）
 * @type number
 * @min -100
 * @max 100
 * @default 0
 * 
 * @command SoundPitch
 * @text サウンドのピッチ変更
 * @desc サウンドのピッチを変更します。
 * 
 * @arg soundId
 * @text 再生識別子
 * @desc サウンドを識別するために設定した名前
 * @default
 * 
 * @arg soundPitch
 * @text ピッチ
 * @desc ピッチの値を設定
 * @type number
 * @default 100
 * 
 * @command PlayBgm
 * @text BGMの再生
 * @desc BGMを再生します。事前読み込みされていた場合は、再生識別子以外のパラメーターは無視されます。
 * 
 * @arg soundId
 * @text 再生識別子
 * @desc サウンドを識別するために付ける名前
 * @default
 * 
 * @arg soundName
 * @text サウンドファイル名
 * @desc bgmフォルダからファイルを指定
 * @type file
 * @dir audio/bgm/
 * 
 * @arg volume
 * @text 音量
 * @desc サウンドの音量（最小値 0　最大値 100）
 * @type number
 * @min 0
 * @max 100
 * @default 100
 * 
 * @command PlayBgs
 * @text BGSの再生
 * @desc BGSを再生します。事前読み込みされていた場合は、再生識別子以外のパラメーターは無視されます。
 * 
 * @arg soundId
 * @text 再生識別子
 * @desc サウンドを識別するために付ける名前
 * @default
 * 
 * @arg soundName
 * @text サウンドファイル名
 * @desc bgsフォルダからファイルを指定
 * @type file
 * @dir audio/bgs/
 * 
 * @arg volume
 * @text 音量
 * @desc サウンドの音量（最小値 0　最大値 100）
 * @type number
 * @min 0
 * @max 100
 * @default 100
 * 
 * @command StopSound
 * @text サウンドの停止
 * @desc 再生しているサウンドを停止します。
 * 
 * @arg soundId
 * @text 再生識別子
 * @desc サウンドを識別するために付ける名前
 * @default
 */

"use strict";//厳格なエラーチェック

var ExSoundBuffer = {};
var ExSound = {};
var ExSoundType = {};

(function (_global) {
   var mgr = AudioManager;

//----------------------------------------------------------------------------
//MV用のプラグインコマンド定義を全てコメントアウト（リクドウ）
//----------------------------------------------------------------------------
//   //プラグインコマンド定義
//   var Game_Interpreter_pluginCommand = Game_Interpreter.prototype.pluginCommand;
//   Game_Interpreter.prototype.pluginCommand = function (command, args) {
//      switch (command) {
//         case "SetSound":
//            Utility.setSound(args[0], args[1], args[2], args[3]);
//            break;
//
//         case "DelSound":
//            Utility.delSound(args[0]);
//            break;
//
//         case "SoundVolume":
//            Utility.soundVolume(args[0], args[1]);
//            break;
//
//         case "SoundPan":
//            Utility.soundPan(args[0], args[1]);
//            break;
//
//         case "SoundPitch":
//            Utility.soundPitch(args[0], args[1]);
//            break;
//
//         case "PlaySound":
//            Utility.playSound(args[0], args[1], args[2], args[3]);
//            break;
//
//         case "StopSound":
//            Utility.stopSound(args[0]);
//            break;
//      }
//      Game_Interpreter_pluginCommand.call(this, command, args);
//   };

//----------------------------------------------------------------------------
//以下、MZ用のプラグインコマンド定義（リクドウ）
//----------------------------------------------------------------------------

	PluginManager.registerCommand('RIKU_MultiSoundPlayer', "SetBgm", args => {
		const soundId = String(args.soundId);
		const soundType = "BGM";
		const soundName = String(args.soundName);
		const volume = String(args.volume);
		Utility.setSound(soundId, soundType, soundName, volume);
    });

	PluginManager.registerCommand('RIKU_MultiSoundPlayer', "SetBgs", args => {
		const soundId = String(args.soundId);
		const soundType = "BGS";
		const soundName = String(args.soundName);
		const volume = String(args.volume);
		Utility.setSound(soundId, soundType, soundName, volume);
    });

	PluginManager.registerCommand('RIKU_MultiSoundPlayer', "DelSound", args => {
		const soundId = String(args.soundId);
		Utility.delSound(soundId);
    });

	PluginManager.registerCommand('RIKU_MultiSoundPlayer', "SoundVolume", args => {
		const soundId = String(args.soundId);
		const volume = String(args.volume);
		Utility.soundVolume(soundId, volume);
    });

	PluginManager.registerCommand('RIKU_MultiSoundPlayer', "SoundPan", args => {
		const soundId = String(args.soundId);
		const soundPan = String(args.soundPan);
		Utility.soundPan(soundId, soundPan);
    });

	PluginManager.registerCommand('RIKU_MultiSoundPlayer', "SoundPitch", args => {
		const soundId = String(args.soundId);
		const soundPitch = String(args.soundPitch);
		Utility.soundPitch(soundId, soundPitch);
    });

	PluginManager.registerCommand('RIKU_MultiSoundPlayer', "PlayBgm", args => {
		const soundId = String(args.soundId);
		const soundType = "BGM";
		const soundName = String(args.soundName);
		const volume = String(args.volume);
		Utility.playSound(soundId, soundType, soundName, volume);
    });

	PluginManager.registerCommand('RIKU_MultiSoundPlayer', "PlayBgs", args => {
		const soundId = String(args.soundId);
		const soundType = "BGS";
		const soundName = String(args.soundName);
		const volume = String(args.volume);
		Utility.playSound(soundId, soundType, soundName, volume);
    });

	PluginManager.registerCommand('RIKU_MultiSoundPlayer', "StopSound", args => {
		const soundId = String(args.soundId);
		Utility.stopSound(soundId);
    });

//MZ用のプラグインコマンド定義ここまで（リクドウ）----------------------------

   function Utility() { }
   Utility.setSound = function (soundId, soundType, soundName, volume) {
      // パラメーターが無ければ実行しない
      if (!soundId || !soundType || !soundName) return;
      var type;
      // サウンドタイプを設定
      if (soundType == "BGM") {
         //MZで動作するように以下書き替え（リクドウ）
         type = "bgm/";
         //type = "bgm";
      } else {
         //MZで動作するように以下書き替え（リクドウ）
         type = "bgs/";
         //type = "bgs";
      }

      // 古いサウンドバッファを削除
      Utility.delSound(soundId);

      // サウンド情報を構築
      var sound = {};
      sound.name = String(soundName);
      sound.pan = 0;
      sound.pitch = 100;

      // ボリュームが指定されていない場合100に固定
      if (!isNaN(Number(volume))) {
         sound.volume = Number(volume).clamp(0, 100);
      } else {
         sound.volume = 100;
      }

      // バッファの作成とパラメーター設定
      ExSoundBuffer[String(soundId)] = mgr.createBuffer(type, sound.name);
      //ExSoundBuffer[String(soundId)] = mgr.createBuffer(type, sound.name);
      Utility.updateSoundParameters(ExSoundBuffer[String(soundId)], sound, soundType);
      // サウンドの情報の登録
      ExSound[String(soundId)] = Object.assign({}, sound);
      // サウンドタイプの登録
      ExSoundType[String(soundId)] = soundType;
   };

   Utility.delSound = function (soundId) {
      if (ExSoundBuffer[String(soundId)]) {
         // バッファ削除
         ExSoundBuffer[String(soundId)].stop();
         ExSoundBuffer[String(soundId)] = null;
         delete ExSoundBuffer[String(soundId)];
         // サウンド情報の削除
         ExSound[String(soundId)] = null;
         delete ExSound[String(soundId)];
         // サウンドタイプの削除
         ExSoundType[String(soundId)] = null;
         delete ExSoundType[String(soundId)];
      }
   };

   Utility.soundVolume = function (soundId, volume) {
      if (ExSoundBuffer[soundId && String(soundId)] && volume) {
         if (!isNaN(Number(volume))) {
            ExSound[String(soundId)].volume = Number(volume).clamp(0, 100);
         } else {
            return;
         }
         Utility.updateSoundParameters(
            ExSoundBuffer[String(soundId)],
            ExSound[String(soundId)],
            ExSoundType[String(soundId)]);
      }
   };

   Utility.soundPan = function (soundId, pan) {
      if (ExSoundBuffer[soundId && String(soundId)] && pan) {
         if (!isNaN(Number(pan))) {
            ExSound[String(soundId)].pan = Number(pan).clamp(-100, 100);
         } else {
            return;
         }
         Utility.updateSoundParameters(
            ExSoundBuffer[String(soundId)],
            ExSound[String(soundId)],
            ExSoundType[String(soundId)]);
      }
   };

   Utility.soundPitch = function (soundId, pitch) {
      if (ExSoundBuffer[soundId && String(soundId)] && pitch) {
         if (!isNaN(Number(pitch))) {
            ExSound[String(soundId)].pitch = Math.round(pitch);
         } else {
            return;
         }
         Utility.updateSoundParameters(
            ExSoundBuffer[String(soundId)],
            ExSound[String(soundId)],
            ExSoundType[String(soundId)]);
      }
   };

   Utility.playSound = function (soundId, soundType, soundName, volume) {
      if (ExSoundBuffer[String(soundId)]) {
         ExSoundBuffer[String(soundId)].play(true, 0);
      } else if (soundId && soundType && soundName) {
         Utility.setSound(soundId, soundType, soundName, volume);
         if (ExSoundBuffer[String(soundId)]) {
            ExSoundBuffer[String(soundId)].play(true, 0);
         }
      }
   };

   Utility.stopSound = function (soundId) {
      if (ExSoundBuffer[String(soundId)]) {
         ExSoundBuffer[String(soundId)].stop();
      }
   };

   Utility.updateSoundParameters = function (buffer, sound, soundType) {
      if (soundType == "BGS") {
         mgr.updateBufferParameters(buffer, mgr._bgsVolume, sound);
      } else if (soundType == "BGM") {
         mgr.updateBufferParameters(buffer, mgr._bgmVolume, sound);
      }
   };

   Object.defineProperty(AudioManager, "bgmVolume", {
      get: function () {
         return this._bgmVolume;
      },
      set: function (value) {
         this._bgmVolume = value;
         this.updateBgmParameters(this._currentBgm);
         // RIKU_MultiSoundPlayerの音量を変更
         for (var soundId in ExSoundType) {
            if (ExSoundType[String(soundId)] == "BGM") {
               Utility.updateSoundParameters(
                  ExSoundBuffer[String(soundId)],
                  ExSound[String(soundId)],
                  ExSoundType[String(soundId)]);
            }
         }
      },
      configurable: true
   });

   Object.defineProperty(AudioManager, "bgsVolume", {
      get: function () {
         return this._bgsVolume;
      },
      set: function (value) {
         this._bgsVolume = value;
         this.updateBgsParameters(this._currentBgs);
         // RIKU_MultiSoundPlayerの音量を変更
         for (var soundId in ExSoundType) {
            if (ExSoundType[String(soundId)] == "BGS") {
               Utility.updateSoundParameters(
                  ExSoundBuffer[String(soundId)],
                  ExSound[String(soundId)],
                  ExSoundType[String(soundId)]);
            }
         }
      },
      configurable: true
   });

})(this);
