﻿//=============================================================================
// PD_Transition_MZ.js
//=============================================================================

/*:
 * @plugindesc Adding to the fadein/fadeout transition effect like to  RPG Maker XP/VX.
 * @author Shio_inu
 *
 * @target MZ
 * @param Duration
 * @desc default duration time (frame)
 * @default 24
 *
 * @command setTransition
 * @text Set transition
 * @desc Set the transition image.
 *
 * @arg fileName
 * @text File name
 * @desc Please input file name of transition image.
 * @type string
 * @default
 *
 * @arg binarization
 * @text Binarization flag
 * @desc Binarization flag.
 * @type boolean
 * @default false
 *
 * @command clearTransition
 * @text Clear transition
 * @desc Clear transition image, return to default.
 * @help
 *
 * @command setDuration
 * @text Set transition duration
 * @desc Set transition duration.
 *
 * @arg duration
 * @text duration frame
 * @desc duration frame.
 * @type number
 * @default 24
 *
 * @help
 * Please make the "transitions" folder, and import the image.
 *
 * Plugin Command:
 *   setTransition fileName binarization  # Set the transition image.
 *   second arguments is Binarization flag.
 *
 *   clearTransition                      # Release the transition image.
 *
 *   setDuration duration                 # Set duration time of the transition.
 *
 * last update : 05th Dec 2020 v1.0.1 for MZ
 *
 */
 
 /*:ja
  * @target MZ
  * @plugindesc 画像によるトランジション演出機能を追加します。
  * @author しおいぬ
  *
  * @param Duration
  * @desc デフォルトの演出時間 (フレーム数)
  * @default 24
  *
  * @command setTransition
  * @text トランジション設定
  * @desc トランジションの画像を設定します。
  *
  * @arg fileName
  * @text ファイル名
  * @desc ファイル名を指定します。
  * @type string
  * @default
  *
  * @arg binarization
  * @text 2値化フラグ
  * @desc 2値化フラグの設定です。
  * @type boolean
  * @default false
  *
  * @command clearTransition
  * @text トランジション画像解除
  * @desc トランジションの画像を解除し、デフォルトに戻します。
  * @help
  *
  * @command setDuration
  * @text 演出時間設定
  * @desc トランジションの演出時間を設定します。
  *
  * @arg duration
  * @text 演出時間
  * @desc 演出時間 (フレーム数)です。
  * @type number
  * @default 24

  * @help
  * トランジション画像は「transitions」フォルダを作成し、その中へ入れて下さい。
  *
  * プラグインコマンド:
  *   トランジション設定 fileName binarization  # トランジション画像をセットします。
  *   第2引数は2値化フラグです。「true」にすることでトランジション画像が2値化されて描画されます。
  *
  *   トランジション画像解除                    # トランジション画像を解除します。
  *
  *   演出時間設定 duration                    # トランジションの演出時間を変更します
  *
  * 要望、バグ報告等はTwitter: https://twitter.com/co_inu へ
  * last update : 2020/12/05 v1.0.1　MZ版作成
  */
(function(){
    var parameters = PluginManager.parameters('PD_Transition_MZ');
    var PD_durationTime = Number(parameters['Duration'] || 24);

    PluginManager.registerCommand("PD_Transition_MZ", "setTransition", args => {
      $gameSystem.setTransition(String(args.fileName), args.binarization);
      console.log("args.binarization: " + args.binarization);
    });

    PluginManager.registerCommand("PD_Transition_MZ", "clearTransition", args => {
      $gameSystem.setTransition(null, false);
    });

    PluginManager.registerCommand("PD_Transition_MZ", "setDuration", args => {
      $gameSystem.setTransitionDuration(Number(args.duration));
    });

    Game_System.prototype.setTransition = function(fileName, binarization) {
        this._transitionFile = fileName;
        this._transitionBin = binarization;
    };
    Game_System.prototype.getTransitionFileName = function() {
        return this._transitionFile;
    };
    Game_System.prototype.isTransitionBinarization = function() {
        //console.log("Bin:" + this._transitionBin);
        return this._transitionBin;
    };
    Game_System.prototype.setTransitionDuration = function(duration) {
        this._transitionDuration = duration;
    };
    Game_System.prototype.getTransitionDuration = function() {
        return this._transitionDuration;
    };

//-----------------------------------------------------------------------------
// Sprite_Transition
//
// トランジション用スプライトの定義です。

    function Sprite_Transition() {
        this.initialize.apply(this, arguments);
    }

    Sprite_Transition.prototype = Object.create(Sprite.prototype);
    Sprite_Transition.prototype.constructor = Sprite_Transition;

    //イニシャライザ
    Sprite_Transition.prototype.initialize = function(white) {
        Sprite.prototype.initialize.call(this);
        this.bitmap = new Bitmap(Graphics.width, Graphics.height);
        this.createTransitionData($gameSystem.getTransitionFileName());
        this._durationMax = 0;
        this._white = white;
        this.z = 4;
    }

    //画像のリロードを行う
    Sprite_Transition.prototype.reload = function() {
        this.createTransitionData($gameSystem.getTransitionFileName());
    }

    //トランジションの元画像を読み込んでトランジション情報を作成する
    Sprite_Transition.prototype.createTransitionData = function(fileName) {
        if(fileName == "none"){
            fileName = null;
        }
        var bitmap = new Bitmap(Graphics.width, Graphics.height);
        this._transitionBitmap = null;
        if(fileName){
            //ファイル名が設定されていたら読み込む
            var bitmap2 = ImageManager.loadTransition($gameSystem.getTransitionFileName());
            if(bitmap2.width == 0 && bitmap2.height == 0 ){
                //すぐに読み込めなかったらバックアップ
                this._transitionBitmap = bitmap2;
            } else {
                 //キャッシュから読み込んだ場合は描画
                 bitmap.blt(bitmap2, 0, 0, bitmap2.width, bitmap2.height,
                                     0, 0, bitmap.width, bitmap.height);
            }
            //console.log("bitmap2 : " + bitmap2.width);
        }
        else {
            //設定されていなかったら適当に作る
            //bitmap = new Bitmap(Graphics.boxWidth, Graphics.boxHeight);
            bitmap.fillAll('rgb(128, 128, 128)');
        }
        //console.log("bitmap : " + bitmap);
        this._transitionData = bitmap.getPixelsData();
        //console.log("pixels : " + this._transitionData);
    }

    Sprite_Transition.prototype.updateBitmap = function(duration, sign) {

        if($gameSystem.isTransitionBinarization()){
            //2値化版
            if (sign > 0) {
                var threshold = (255 * duration / this._durationMax);
                //console.log("fadein bin threshold : " + threshold);
                this.bitmap.createTransitionBinarizationFadeIn(this._transitionData, threshold);
            } else {
                var threshold = 255 - (255 * duration / this._durationMax);
                //console.log("fadeout bin threshold : " + threshold);
                this.bitmap.createTransitionBinarizationFadeOut(this._transitionData, threshold, this._white);
            }
        }
        else {
            //通常版
            speed = 255 / (this._durationMax / 2);
            //console.log("speed : " + speed);
            if (sign > 0) {
                var threshold = (255 * duration / this._durationMax);
                //console.log("fadein normal threshold : " + threshold);
                this.bitmap.createTransitionFadeIn(this._transitionData, threshold, speed);
            } else {
                var threshold = 510 - (255 * duration / (this._durationMax / 2));
                //console.log("fadeout normal threshold : " + threshold);
                this.bitmap.createTransitionFadeOut(this._transitionData, threshold, speed, this._white);
            }
        }
    }

    Sprite_Transition.prototype.setDefault = function(sign) {
        if(this._transitionBitmap){
            if(!this._transitionBitmap.isReady()){
                return false;
            }
            var bitmap = new Bitmap(Graphics.width, Graphics.height);
            bitmap.blt(this._transitionBitmap, 0, 0, this._transitionBitmap.width, this._transitionBitmap.height,
                                               0, 0, bitmap.width, bitmap.height);
            this._transitionData = bitmap.getPixelsData();
            this._transitionBitmap = null;
        }
        if (sign > 0) {
            //フェードイン
            if(this._white){
                this.bitmap.fillAll('rgb(255, 255, 255)');
            } else {
                this.bitmap.fillAll('rgb(0, 0, 0)');
            }
        } else {
            //フェードアウト
            if(this._white){
                this.bitmap.fillAll('rgba(255, 255, 255, 0)');
                // 完全に透明なピクセルは黒扱いされる
            } else {
                this.bitmap.fillAll('rgba(0, 0, 0, 0)');
            }
        }
        return true;
    }

    Sprite_Transition.prototype.setDurationMax = function(d) {
        this._durationMax = d;
    }
    Sprite_Transition.prototype.getDurationMax = function() {
        return this._durationMax;
    }
    Sprite_Transition.prototype.setWhite = function(white) {
        this._white = white;
    }

ImageManager.loadTransition = function(filename, hue) {
    return this.loadBitmap('img/transitions/', filename, hue, true);
};

const _Scene_Base_prototype_startFadeIn = Scene_Base.prototype.startFadeIn;
Scene_Map.prototype.startFadeIn = function(duration, white) {
    this.createFadeSprite(white);
    this._fadeSprite.opacity = 255;
    _Scene_Base_prototype_startFadeIn.apply(this, arguments);
};
const _Scene_Base_prototype_startFadeOut = Scene_Base.prototype.startFadeOut;
Scene_Map.prototype.startFadeOut = function(duration, white) {
    this.createFadeSprite(white);
    this._fadeSprite.opacity = 0;
    _Scene_Base_prototype_startFadeOut.apply(this, arguments);
};

const _Scene_Map_prototype_initialize = Scene_Map.prototype.initialize;
Scene_Map.prototype.initialize = function() {
  _Scene_Map_prototype_initialize.apply(this, arguments);
  if(this._fadeSprite){
    console.log("this._fadeSprite.opacity:" + this._fadeSprite.opacity);
  }
  this._fadeSprite = null;
}

Scene_Map.prototype.createFadeSprite = function(white) {
    if (this._fadeSprite) {
      this._spriteset.removeChild(this._fadeSprite);
      this._fadeSprite = null;
    }
    this._fadeSprite = new Sprite_Transition(white);
    this._spriteset.addChild(this._fadeSprite);
};

Scene_Map.prototype.reload = function() {
    if (this._fadeSprite) {
        this._fadeSprite.reload();
    } else {
        this.createFadeSprite(false);
    }
};

Scene_Map.prototype.updateFade = function() {

    if (this._fadeDuration > 0) {
        if(this._fadeSprite.getDurationMax() == 0){
            var ready = this._fadeSprite.setDefault(this._fadeSign);
            if(!ready){
                return;
            }
            this._fadeSprite.setDurationMax(this._fadeDuration);
        }
        var d = this._fadeDuration - 1;
        this._fadeSprite.opacity = 255;
        this._fadeSprite.updateBitmap(d, this._fadeSign);
        this._fadeDuration--;
        if(d == this._fadeSprite.getDurationMax()){
          this._fadeOpacity = 255;
        } else {
          this._fadeOpacity = 0;
        }
    } else if(this._fadeSprite) {
        //this._fadeSprite.opacity = 0;
        if(this._fadeSprite.getDurationMax() != 0){
            this._fadeSprite.setDurationMax(0);
        }
    }
};

// Fadeout Screen
Game_Interpreter.prototype.command221 = function() {
    if (!$gameMessage.isBusy()) {
        SceneManager._scene.startFadeOut($gameSystem.getTransitionDuration() || PD_durationTime);
        this.wait($gameSystem.getTransitionDuration() || PD_durationTime);
        this._index++;
    }
    return false;
};

// Fadein Screen
Game_Interpreter.prototype.command222 = function() {
    if (!$gameMessage.isBusy()) {
        SceneManager._scene.startFadeIn($gameSystem.getTransitionDuration() || PD_durationTime);
        this.wait($gameSystem.getTransitionDuration() || PD_durationTime);
        this._index++;
    }
    return false;
};

//トランジションデータを作る
Bitmap.prototype.createTransitionBinarizationFadeIn = function(data, threshold) {

    if(this.width > 0 && this.height > 0){
        var context = this._context;
        var imageData = context.getImageData(0, 0, this.width, this.height);
        var pixels = imageData.data;
        for(var i = 0; i<pixels.length; i+=4){
            if(pixels[i + 3] == 255){
               var alpha = (data[i] >= threshold) ? 0 : 255;
               pixels[i + 3] = alpha;
            }
        }
        context.putImageData(imageData, 0, 0);
        this._baseTexture.update();
    }
};

Bitmap.prototype.createTransitionBinarizationFadeOut = function(data, threshold, white) {
    if(this.width > 0 && this.height > 0){
        var context = this._context;
        var imageData = context.getImageData(0, 0, this.width, this.height);
        var pixels = imageData.data;
        for(var i = 0; i<pixels.length; i+=4){
            if(pixels[i + 3] == 0){
               var alpha = (data[i] > threshold) ? 0 : 255;
               pixels[i + 3] = alpha;
            }
            if(white){
               pixels[i] = 255;
               pixels[i + 1] = 255;
               pixels[i + 2] = 255;
            }
        }
        context.putImageData(imageData, 0, 0);
        this._baseTexture.update();
    }
};

Bitmap.prototype.createTransitionFadeIn = function(data, threshold, speed) {

    if(this.width > 0 && this.height > 0){
        var context = this._context;
        var imageData = context.getImageData(0, 0, this.width, this.height);
        var pixels = imageData.data;
        for(var i = 0; i<pixels.length; i+=4){
            if(pixels[i + 3] == 255){
               var alpha = (data[i] >= threshold) ? (255 - speed) : 255;
               pixels[i + 3] = alpha;
            } else if(pixels[i + 3] != 0) {
               pixels[i + 3] -= speed;
            }
        }
        context.putImageData(imageData, 0, 0);
        this._baseTexture.update();
    }
};

Bitmap.prototype.createTransitionFadeOut = function(data, threshold, speed, white) {
    if(this.width > 0 && this.height > 0){
        var context = this._context;
        var imageData = context.getImageData(0, 0, this.width, this.height);
        var pixels = imageData.data;
        for(var i = 0; i<pixels.length; i+=4){
            if(pixels[i + 3] == 0){
               var alpha = (data[i] <= threshold) ? speed : 0;
               pixels[i + 3] = alpha;
            } else if(pixels[i + 3] != 255) {
               pixels[i + 3] += speed;
            }
            if(white){
               pixels[i] = 255;
               pixels[i + 1] = 255;
               pixels[i + 2] = 255;
            }
        }
        context.putImageData(imageData, 0, 0);
        this._baseTexture.update();
    }
};

//画像データの配列情報を取得する
Bitmap.prototype.getPixelsData = function() {

    if(this.width > 0 && this.height > 0){
        var context = this._context;
        var imageData = context.getImageData(0, 0, this.width, this.height);
        var pixels = imageData.data;
        return pixels;
    }
};

})();
