//=============================================================================
// RPGツクールMZ - LL_StandingPicture.js v2.3.0
//-----------------------------------------------------------------------------
// ルルの教会 (Lulu's Church)
// https://nine-yusha.com/
//
// URL below for license details.
// https://nine-yusha.com/plugin/
//=============================================================================

/*:
 * @target MZ
 * @plugindesc A standing picture is displayed when the message window is displayed.
 * @author Lulu's Church
 * @url https://nine-yusha.com/plugin-spicture/
 *
 * @help LL_StandingPicture.js
 *
 * The standing picture is automatically displayed
 * when the message window is displayed.
 * Use control characters to display.
 *
 * ※Half-width alphanumeric characters and underscore (_)
 *   can be used for the standing picture ID.
 *   The standing picture ID can also be specified by a variable.
 *   【Example】\F[\V[1]]
 *
 * Control Character:
 *   \F["ID"]   Show StandingPicture No.1.  【Example】\F[lulu_smile]
 *   \M["MOTION"]   Play motion is StandingPicture.  【Example】\M[yes]
 *   \A[F]  Focus on StandingPicture No.1. (Darken No.2)
 *   \FF["ID"]  Show StandingPicture No.2.
 *   \MM["MOTION"]  Play motion is StandingPicture No.2.
 *   \AA[FF]  Focus on StandingPicture No.2. (Darken No.1)
 *   \AA[N]  Darken All.
 *
 * Motion List:
 *   yes, yesyes, no, noslow,
 *   jump, jumpjump, jumploop, shake, shakeloop,
 *   runleft, runright
 *
 * Plugin Command:
 *   Display ON・OFF: If you turn it off, it will not be displayed.
 *   Change Color Tone: Change the color tone of the standing picture.
 *
 * Creater: Lulu's Church
 * Update: 2020/11/16
 *
 * @command setEnabled
 * @text Display ON・OFF
 * @desc If you turn it off, it will not be displayed.
 *
 * @arg enabled
 * @text Display settings
 * @desc If you turn it off, it will not be displayed.
  *@default true
 * @type boolean
 *
 * @command setTone
 * @text Change Color Tone
 * @desc Change the color tone of the standing picture.
 *
 * @arg toneR
 * @text Red
 * @desc Red. (-255～255)
 * @default 0
 * @type number
 * @min -255
 * @max 255
 *
 * @arg toneG
 * @text Green
 * @desc Green. (-255～255)
 * @default 0
 * @type number
 * @min -255
 * @max 255
 *
 * @arg toneB
 * @text Blue
 * @desc Blue. (-255～255)
 * @default 0
 * @type number
 * @min -255
 * @max 255
 *
 * @arg toneC
 * @text Gray
 * @desc grayscale. (0～255)
 * @default 0
 * @type number
 * @min 0
 * @max 255
 *
 * @param sPictures
 * @text Standing Picture Lists
 * @desc Create a standing picture lists.
 * @default []
 * @type struct<sPictures>[]
 *
 * @param picture1Settings
 * @text No.1(\F) Settings
 * @desc ※This item is not used.
 *
 * @param transition
 * @text Transition
 * @desc Specify the switching effect when appearing / erasing.
 * @type select
 * @default 1
 * @option None
 * @value 0
 * @option Fade
 * @value 1
 * @option Float Left
 * @value 2
 * @option Float Right
 * @value 3
 * @option Float Bottom
 * @value 4
 * @option Float Top
 * @value 5
 * @parent picture1Settings
 *
 * @param foreFront
 * @text Displayed in front of the window.
 * @desc When turned on, it is displayed in front of the message window.
 * @type boolean
 * @default false
 * @parent picture1Settings
 *
 * @param picture2Settings
 * @text No.2(\FF) Settings
 * @desc ※This item is not used.
 *
 * @param transition2
 * @text Transition (No.2)
 * @desc Specify the switching effect when appearing / erasing.
 * @type select
 * @default 1
 * @option None
 * @value 0
 * @option Fade
 * @value 1
 * @option Float Left
 * @value 2
 * @option Float Right
 * @value 3
 * @option Float Bottom
 * @value 4
 * @option Float Top
 * @value 5
 * @parent picture2Settings
 *
 * @param foreFront2
 * @text Displayed in front of the window.
 * @desc When turned on, it is displayed in front of the message window.
 * @type boolean
 * @default false
 * @parent picture2Settings
 *
 * @param focusToneAdjust
 * @text Darkness at focus.
 * @desc It ’s the darkness when the focus is applied. (-255～0)
 * Adjust if it gets too dark. (initial: -96)
 * @default -96
 * @min -255
 * @max 0
 * @type number
 *
 * @param catheBootPicture
 * @text Preloaded when the boot.
 * @desc Eliminates display lag during browser play.
 * Startup may be delayed depending on the number of images and line speed.
 * @default true
 * @type boolean
 */

/*~struct~sPictures:
 *
 * @param id
 * @text ID
 * @desc ID. It is used when calling with control characters.
 * @type string
 *
 * @param imageName
 * @text Image File
 * @desc Select the image file to be displayed as a standing picture.
 * @dir img/pictures
 * @type file
 * @require 1
 *
 * @param origin
 * @text Origin
 * @desc Origin of standing picture.
 * @default 0
 * @type select
 * @option Upper Left
 * @value 0
 * @option Center
 * @value 1
 *
 * @param x
 * @text X coordinate (No.1)
 * @desc Standing Picture(F) Display position when called (X).
 * @default 400
 * @min -2000
 * @max 2000
 * @type number
 *
 * @param y
 * @text Y coordinate (No.1)
 * @desc Standing Picture(F) Display position when called (Y).
 * @default 96
 * @min -2000
 * @max 2000
 * @type number
 *
 * @param x2
 * @text X coordinate (No.2)
 * @desc Standing Picture(FF) Display position when called (X).
 * @default 20
 * @min -2000
 * @max 2000
 * @type number
 *
 * @param y2
 * @text Y coordinate (No.2)
 * @desc Standing Picture(FF) Display position when called (Y).
 * @default 96
 * @min -2000
 * @max 2000
 * @type number
 *
 * @param reverse
 * @text No.2 Flip horizontal
 * @desc Standing Picture(FF) Flip horizontal.
 * @default 1
 * @type select
 * @option None
 * @value 1
 * @option Flip horizontal
 * @value -1
 *
 * @param scaleX
 * @text Width (%)
 * @desc Specify the percentage to scale the image.
 * @default 100
 * @min -2000
 * @max 2000
 * @type number
 *
 * @param scaleY
 * @text Height (%)
 * @desc Specify the percentage to scale the image.
 * @default 100
 * @min -2000
 * @max 2000
 * @type number
 *
 * @param opacity
 * @text Opacity
 * @desc Specify the opacity(0～255).
 * @default 255
 * @type number
 * @min 0
 * @max 255
 *
 * @param blendMode
 * @text Blend Mode
 * @desc Specify how to blend the image colors.
 * @default 0
 * @type select
 * @option Normal
 * @value 0
 * @option Additive
 * @value 1
 * @option Subtraction
 * @value 2
 * @option Screen
 * @value 3
 */

/*:ja
 * @target MZ
 * @plugindesc メッセージウィンドウ表示時に立ち絵を表示します。
 * @author ルルの教会
 * @url https://nine-yusha.com/plugin-spicture/
 *
 * @help LL_StandingPicture.js
 *
 * メッセージ内に専用の制御文字を入力することで、
 * 立ち絵を表示できます。
 *
 * ※立ち絵IDに半角英数字とアンダースコア(_)が使用できるようになりました。
 *   lulu_smileのように[名前_表情名]と付けるとわかりやすいです。
 *   また立ち絵IDは変数で指定することも可能です。 【例】\F[\V[1]]
 *
 * 専用制御文字:
 *   \F[立ち絵ID]       立ち絵1を表示します。 【例】\F[lulu_smile]
 *   \M[モーション名]   立ち絵1のモーションを再生します。 【例】\M[yes]
 *   \A[F]             立ち絵1にフォーカスを当てます。 (立ち絵2を暗く)
 *   \FF[立ち絵ID]      立ち絵2を表示します。
 *   \MM[モーション名]  立ち絵2のモーションを再生します。
 *   \AA[FF]            立ち絵2にフォーカスを当てます。 (立ち絵1を暗く)
 *   \AA[N]             立ち絵を全て暗くします。
 *
 * 立ち絵モーション一覧:
 *   yes(頷く)、yesyes(二回頷く)、no(横に揺れる)、noslow(ゆっくり横に揺れる)
 *   jump(跳ねる)、jumpjump(二回跳ねる)、jumploop(跳ね続ける)
 *   shake(ガクガク)、shakeloop(ガクガクし続ける)
 *   runleft(画面左へ走り去る)、runright(画面右へ走り去る)
 *
 * プラグインコマンド:
 *   立ち絵表示ON・OFF: 立ち絵の表示・非表示を一括制御します。 (初期値: ON)
 *   色調変更: 立ち絵の色調を変更します。
 *
 * 利用規約:
 *   ・著作権表記は必要ございません。
 *   ・利用するにあたり報告の必要は特にございません。
 *   ・商用・非商用問いません。
 *   ・R18作品にも使用制限はありません。
 *   ・ゲームに合わせて自由に改変していただいて問題ございません。
 *   ・プラグイン素材としての再配布（改変後含む）は禁止させていただきます。
 *
 * 作者: ルルの教会
 * 作成日: 2021/2/25
 *
 * @command setEnabled
 * @text 立ち絵表示ON・OFF
 * @desc 立ち絵の表示・非表示を一括制御します。
 *
 * @arg enabled
 * @text 立ち絵表示
 * @desc OFFにすると立ち絵が表示されなくなります。
 * @default true
 * @type boolean
 *
 * @command setTone
 * @text 色調変更
 * @desc 立ち絵の色調を変更します。
 *
 * @arg toneR
 * @text 赤
 * @desc 色調のR成分です。 (-255～255)
 * @default 0
 * @type number
 * @min -255
 * @max 255
 *
 * @arg toneG
 * @text 緑
 * @desc 色調のG成分です。 (-255～255)
 * @default 0
 * @type number
 * @min -255
 * @max 255
 *
 * @arg toneB
 * @text 青
 * @desc 色調のB成分です。 (-255～255)
 * @default 0
 * @type number
 * @min -255
 * @max 255
 *
 * @arg toneC
 * @text グレー
 * @desc グレースケールの強さです。 (0～255)
 * @default 0
 * @type number
 * @min 0
 * @max 255
 *
 * @param sPictures
 * @text 立ち絵リスト
 * @desc メッセージウィンドウに表示する立ち絵を定義します。
 * @default []
 * @type struct<sPictures>[]
 *
 * @param picture1Settings
 * @text 立ち絵1(\F)の設定
 * @desc ※この項目は使用しません
 *
 * @param transition
 * @text 切替効果
 * @desc 出現・消去時の切替効果を指定します。
 * @type select
 * @default 1
 * @option なし
 * @value 0
 * @option フェード
 * @value 1
 * @option フロート左
 * @value 2
 * @option フロート右
 * @value 3
 * @option フロート下
 * @value 4
 * @option フロート上
 * @value 5
 * @parent picture1Settings
 *
 * @param foreFront
 * @text ウィンドウの前面に表示
 * @desc ONにするとメッセージウィンドウよりも前面に表示されます。
 * @type boolean
 * @default false
 * @parent picture1Settings
 *
 * @param picture2Settings
 * @text 立ち絵2(\FF)の設定
 * @desc ※この項目は使用しません
 *
 * @param transition2
 * @text 切替効果
 * @desc 出現・消去時の切替効果を指定します。
 * @type select
 * @default 1
 * @option なし
 * @value 0
 * @option フェード
 * @value 1
 * @option フロート左
 * @value 2
 * @option フロート右
 * @value 3
 * @option フロート下
 * @value 4
 * @option フロート上
 * @value 5
 * @parent picture2Settings
 *
 * @param foreFront2
 * @text ウィンドウの前面に表示
 * @desc ONにするとメッセージウィンドウよりも前面に表示されます。
 * @type boolean
 * @default false
 * @parent picture2Settings
 *
 * @param focusToneAdjust
 * @text フォーカス時の暗さ
 * @desc AA[s]でフォーカスを当てた時の暗さ(-255～0)です。
 * 暗くなりすぎる場合に調整してください。(初期値: -96)
 * @default -96
 * @min -255
 * @max 0
 * @type number
 *
 * @param catheBootPicture
 * @text ゲーム起動時に事前ロード
 * @desc アツマールなどブラウザプレイ時の読み込み待ちを解消します。
 * 画像数や回線速度により起動が遅くなる場合があります。
 * @default true
 * @type boolean
 */

/*~struct~sPictures:ja
 *
 * @param id
 * @text 立ち絵ID
 * @desc 立ち絵IDです。立ち絵を制御文字で呼び出す際に使用します。
 * 半角英数字(_)で入力してください。(例: lulu_smile)
 * @type string
 *
 * @param imageName
 * @text 画像ファイル名
 * @desc 立ち絵として表示する画像ファイルを選択してください。
 * @dir img/pictures
 * @type file
 * @require 1
 *
 * @param origin
 * @text 原点
 * @desc 立ち絵の原点です。
 * @default 0
 * @type select
 * @option 左上
 * @value 0
 * @option 中央
 * @value 1
 *
 * @param x
 * @text X座標 (立ち絵1)
 * @desc 立ち絵1(F)で呼び出された時の表示位置(X)です。
 * @default 400
 * @min -2000
 * @max 2000
 * @type number
 *
 * @param y
 * @text Y座標 (立ち絵1)
 * @desc 立ち絵1(F)で呼び出された時の表示位置(Y)です。
 * @default 96
 * @min -2000
 * @max 2000
 * @type number
 *
 * @param x2
 * @text X座標 (立ち絵2)
 * @desc 立ち絵2(FF)で呼び出された時の表示位置(X)です。
 * @default 20
 * @min -2000
 * @max 2000
 * @type number
 *
 * @param y2
 * @text Y座標 (立ち絵2)
 * @desc 立ち絵2(FF)で呼び出された時の表示位置(Y)です。
 * @default 96
 * @min -2000
 * @max 2000
 * @type number
 *
 * @param reverse
 * @text 立ち絵2の左右反転
 * @desc 立ち絵2(FF)で呼び出された時の表示方法です。
 * @default 1
 * @type select
 * @option 左右反転しない
 * @value 1
 * @option 左右反転する
 * @value -1
 *
 * @param scaleX
 * @text X拡大率
 * @desc 立ち絵の拡大率(X)です。
 * @default 100
 * @min -2000
 * @max 2000
 * @type number
 *
 * @param scaleY
 * @text Y拡大率
 * @desc 立ち絵の拡大率(Y)です。
 * @default 100
 * @min -2000
 * @max 2000
 * @type number
 *
 * @param opacity
 * @text 不透明度
 * @desc 立ち絵の不透明度(0～255)です。
 * @default 255
 * @type number
 * @min 0
 * @max 255
 *
 * @param blendMode
 * @text 合成方法
 * @desc 立ち絵の合成方法です。
 * @default 0
 * @type select
 * @option 通常
 * @value 0
 * @option 加算
 * @value 1
 * @option 除算
 * @value 2
 * @option スクリーン
 * @value 3
 */

/*:es
 * @target MZ
 * @plugindesc The standing picture is automatically displayed when the message window is displayed.
 * @author Lulu's Church
 * @url https://nine-yusha.com/plugin-spicture/
 *
 * @help LL_StandingPicture.js
 *
 * Ingresando un carácter de control dedicado en el mensaje
 * Las imágenes de pie se pueden mostrar automáticamente.
 *
 * ※Se pueden usar caracteres alfanuméricos de ancho medio y guión bajo (_)
 *   para la identificación con foto de pie.
 *   La identificación con foto de pie también se puede especificar mediante una variable.
 *   【Ejemplo de entrada】\F[\V[1]]
 *
 * Carácteres que van en el cuadro de texto:
 *   \F["ID"]   Se muestra la imagen de pie 1.  【Ejemplo de entrada】\F[lulu_smile]
 *   \M["MOTION"]   Reproduzca el movimiento de la imagen de pie 1. 【Ejemplo de entrada】\M[yes]
 *   \AA[F]  Centrarse en la imagen de pie 1. (Oscurecer imagen de pie 2)
 *   \FF["ID"]   Se muestra la imagen de pie 2.
 *   \MM["MOTION"]   Reproduzca el movimiento de la imagen de pie 2.
 *   \AA[FF]  Centrarse en la imagen de pie 2. (Oscurecer imagen de pie 1)
 *   \AA[N]  Oscurecer todo.
 *
 * Lista de movimiento permanente:
 *   yes(cabecear)、yesyes(Asiente dos veces con la cabeza)、no(Agitar de lado)、noslow(Balancearse lentamente)
 *   jump(rebota)、jumpjump(Rebota dos veces)、jumploop(rebota constantemente)
 *   shake(Espasmódico)、shakeloop(Sigue siendo desigual)
 *   runleft(Sale a la izquierda de la pantalla)、runright(Sale a la derecha de la pantalla)
 *
 * Comandos de complementos:
 *   Visualización de imagen de pie ON・OFF: Controlar colectivamente la visualización / no visualización de imágenes de pie。
 *   Cambiar color: cambia el color de la imagen de pie。
 *
 * Autor: Lulu's Church
 * Fecha de creación: 2020/11/16
 *
 * @command setEnabled
 * @text Visualización de imagen de pieON・OFF
 * @desc Puede controlar la visualización / no visualización de imágenes de pie a la vez.
 *
 * @arg enabled
 * @text Visualización de imagen de pie
 * @desc OFF Si se establece en no, ON se mostrará la imagen de pie.
 * @default true
 * @type boolean
 *
 * @command setTone
 * @text Cambio de tono de color
 * @desc Cambia el tono de color de la imagen de pie.
 *
 * @arg toneR
 * @text rojo
 * @desc Es el componente R del tono de color. (-255～255)
 * @default 0
 * @type number
 * @min -255
 * @max 255
 *
 * @arg toneG
 * @text Verde
 * @desc Es el componente V del tono de color. (-255～255)
 * @default 0
 * @type number
 * @min -255
 * @max 255
 *
 * @arg toneB
 * @text Azul
 * @desc Es el componente A del tono de color. (-255～255)
 * @default 0
 * @type number
 * @min -255
 * @max 255
 *
 * @arg toneC
 * @text gris
 * @desc Escala de grises. (0～255)
 * @default 0
 * @type number
 * @min 0
 * @max 255
 *
 * @param sPictures
 * @text Lista de imágenes de pie
 * @desc Define la imagen de pie que se mostrará en la ventana de mensajes.
 * @default []
 * @type struct<sPictures>[]
 *
 * @param picture1Settings
 * @text Ajuste de imagen de pie 1(\F).
 * @desc ※Este artículo no se usa
 *
 * @param transition
 * @text Efecto de cambio
 * @desc Especifique el efecto de conmutación al aparecer / borrar.
 * @type select
 * @default 1
 * @option Ninguna
 * @value 0
 * @option Desvanecerse
 * @value 1
 * @option Flotar a la izquierda
 * @value 2
 * @option Flotar a la derecha
 * @value 3
 * @option Bajo el flotador
 * @value 4
 * @option En el flotador
 * @value 5
 * @parent picture1Settings
 *
 * @param foreFront
 * @text Mostrar en el frente de la ventana
 * @desc Cuando se enciende, se muestra delante de la ventana del mensaje.
 * @type boolean
 * @default false
 * @parent picture1Settings
 *
 * @param picture2Settings
 * @text Ajuste de imagen de pie 2(\FF).
 * @desc ※Este artículo no se usa
 *
 * @param transition2
 * @text Efecto de cambio
 * @desc Especifique el efecto de conmutación al aparecer / borrar.
 * @type select
 * @default 1
 * @option Ninguna
 * @value 0
 * @option Desvanecerse
 * @value 1
 * @option Flotar a la izquierda
 * @value 2
 * @option Flotar a la derecha
 * @value 3
 * @option Bajo el flotador
 * @value 4
 * @option En el flotador
 * @value 5
 * @parent picture2Settings
 *
 * @param foreFront2
 * @text Mostrar en el frente de la ventana
 * @desc Cuando se enciende, se muestra delante de la ventana del mensaje.
 * @type boolean
 * @default false
 * @parent picture2Settings
 *
 * @param focusToneAdjust
 * @text Oscuridad en foco
 * @desc La oscuridad cuando se aplica el enfoque. (-255～0)
 * Ajuste si se pone demasiado oscuro. (inicial: -96)
 * @default -96
 * @min -255
 * @max 0
 * @type number
 *
 * @param catheBootPicture
 * @text Precarga al inicio
 * @desc Elimina el retraso de visualización durante el juego del navegador.
 * Puede que tarde un poco en comenzar el juego.
 * @default true
 * @type boolean
 */

/*~struct~sPictures:es
 *
 * @param id
 * @text ID
 * @desc ID Se utiliza cuando se llama a una imagen de pie con un carácter de control.
 * @type string
 *
 * @param imageName
 * @text Nombre del archivo de imagen
 * @desc Seleccione el archivo de imagen que se mostrará como una imagen de pie.
 * @dir img/pictures
 * @type file
 * @require 1
 *
 * @param origin
 * @text Origen
 * @desc Es el origen del cuadro de pie.
 * @default 0
 * @type select
 * @option Arriba a la izquierda
 * @value 0
 * @option central
 * @value 1
 *
 * @param x
 * @text Xcoordenada (Imagen de pie1)
 * @desc Posición de la pantalla cuando se llama desde la imagen de pie 1 (F)(X)es.
 * @default 464
 * @min -2000
 * @max 2000
 * @type number
 *
 * @param y
 * @text Ycoordenada (Imagen de pie1)
 * @desc Esta es la posición de visualización (Y) cuando se llama en Imagen de pie 1 (F).
 * @default 96
 * @min -2000
 * @max 2000
 * @type number
 *
 * @param x2
 * @text Xcoordenada (Imagen de pie2)
 * @desc Imagen de pie2(FF)Mostrar posición cuando se llama con(X)es.
 * @default 20
 * @min -2000
 * @max 2000
 * @type number
 *
 * @param y2
 * @text Ycoordenada (Imagen de pie2)
 * @desc Imagen de pie2(FF)Mostrar posición cuando se llama con(Y)es.
 * @default 96
 * @min -2000
 * @max 2000
 * @type number
 *
 * @param reverse
 * @text Imagen de pie2Inversión de izquierda a derecha
 * @desc Imagen de pie2(FF)Este es el método de visualización cuando se llama con.
 * @default 1
 * @type select
 * @option No gire a la izquierda y a la derecha
 * @value 1
 * @option Voltear a la izquierda y a la derecha
 * @value -1
 *
 * @param scaleX
 * @text XTasa de expansión
 * @desc Tasa de ampliación de la imagen de pie(X)es.
 * @default 100
 * @min -2000
 * @max 2000
 * @type number
 *
 * @param scaleY
 * @text YTasa de expansión
 * @desc Es la relación de ampliación (Y) de la imagen de pie.
 * @default 100
 * @min -2000
 * @max 2000
 * @type number
 *
 * @param opacity
 * @text Opacidad
 * @desc Opacidad de la imagen de pie(0～255)es.
 * @default 255
 * @type number
 * @min 0
 * @max 255
 *
 * @param blendMode
 * @text resolver resolución
 * @desc Es un método para sintetizar imágenes de pie.
 * @default 0
 * @type select
 * @option Normal
 * @value 0
 * @option Añadir
 * @value 1
 * @option Dividir
 * @value 2
 * @option Pantalla
 * @value 3
 */

(() => {
	"use strict";
	const pluginName = "LL_StandingPicture";

	const parameters = PluginManager.parameters(pluginName);
	// 立ち絵1の設定
	const transition = Number(parameters["transition"] || 1);
	const foreFront = eval(parameters["foreFront"] || "false");
	// 立ち絵2の設定
	const transition2 = Number(parameters["transition2"] || 1);
	const foreFront2 = eval(parameters["foreFront2"] || "false");

	const focusToneAdjust = Number(parameters["focusToneAdjust"] || -96);
	const catheBootPicture = eval(parameters["catheBootPicture"] || "true");
	const sPictures = JSON.parse(parameters["sPictures"] || "null");
	let sPictureLists = [];
	if (sPictures) {
		sPictures.forEach((elm) => {
			sPictureLists.push(JSON.parse(elm));
		});
	}

	PluginManager.registerCommand(pluginName, "setEnabled", args => {
		const enabled = eval(args.enabled || "true");
		$gameSystem._StandingPictureDisabled = !enabled;
	});

	PluginManager.registerCommand(pluginName, "setTone", args => {
		const pictureTone = [Number(args.toneR), Number(args.toneG), Number(args.toneB), Number(args.toneC)];
		$gameSystem._StandingPictureTone = pictureTone;
	});

	// 独自変数定義
	let animationCount = 0;
	let spriteSPicture = null;
	let showSPicture = false;
	let refSPicture = false;
	let motionSPicture = "";
	let animationCount2 = 0;
	let spriteSPicture2 = null;
	let showSPicture2 = false;
	let refSPicture2 = false;
	let motionSPicture2 = "";
	let focusSPicture = null;

	// アニメーションフレーム数定義
	const animationFrame = {
		"yes":       24,
		"yesyes":    48,
		"no":        24,
		"noslow":    48,
		"jump":      24,
		"jumpjump":  48,
		"jumploop":  48,
		"shake":     1,
		"shakeloop": 1,
		"runleft":   1,
		"runright":  1,
		"none":      0
	};

	//-----------------------------------------------------------------------------
	// ExStandingPicture
	//
	// 立ち絵を表示する独自のクラスを追加定義します。

	class ExStandingPicture {

		static create (elm) {
			// 立ち絵1
			elm._spSprite = new Sprite();
			elm._spSprite.bitmap = null;
			elm._spSprite.opacity = 0;
			elm._spSprite.opening = false;
			elm._spSprite.closing = false;
			elm._spSprite.originX = 0;
			elm._spSprite.originY = 0;
			elm._spSprite.showing = false;
			// 立ち絵2
			elm._spSprite2 = new Sprite();
			elm._spSprite2.bitmap = null;
			elm._spSprite2.opacity = 0;
			elm._spSprite2.opening = false;
			elm._spSprite2.closing = false;
			elm._spSprite2.originX = 0;
			elm._spSprite2.originY = 0;
			elm._spSprite2.showing = false;
			// 重なり順を指定
			if (foreFront) {
				elm.addChildAt(elm._spSprite, elm.children.indexOf(elm._windowLayer) + 1);
			} else {
				elm.addChildAt(elm._spSprite, elm.children.indexOf(elm._spriteset) + 1);
			}
			if (foreFront2) {
				elm.addChildAt(elm._spSprite2, elm.children.indexOf(elm._windowLayer) + 1);
			} else {
				elm.addChildAt(elm._spSprite2, elm.children.indexOf(elm._spriteset) + 1);
			}
		}

		static update (elm) {
			// 立ち絵を非表示に設定している場合、処理を中断
			if ($gameSystem._StandingPictureDisabled) {
				elm._spSprite.opacity = 0;
				elm._spSprite2.opacity = 0;
				return;
			}
			// 立ち絵1ピクチャ作成
			if (spriteSPicture && refSPicture) {
				this.refresh(elm._spSprite, spriteSPicture, 1);
				refSPicture = false;
			}
			// 立ち絵2ピクチャ作成
			if (spriteSPicture2 && refSPicture2) {
				this.refresh(elm._spSprite2, spriteSPicture2, 2);
				refSPicture2 = false;
			}

			// フォーカス処理
			if (focusSPicture == 1 || focusSPicture == 0) {
				elm._spSprite2.setBlendColor([0, 0, 0, (focusToneAdjust * -1)]);
			}
			if (focusSPicture == 2 || focusSPicture == 0) {
				elm._spSprite.setBlendColor([0, 0, 0, (focusToneAdjust * -1)]);
			}

			// フェード処理
			if (showSPicture) {
				this.fadeIn(elm._spSprite, spriteSPicture, 1);
			} else {
				this.fadeOut(elm._spSprite, spriteSPicture, 1);
			}
			if (showSPicture2) {
				this.fadeIn(elm._spSprite2, spriteSPicture2, 2);
			} else {
				this.fadeOut(elm._spSprite2, spriteSPicture2, 2);
			}

			// 立ち絵モーション再生
			if (!elm._spSprite.opening && !elm._spSprite.closing && animationCount > 0) {
				animationCount = this.animation(elm._spSprite, motionSPicture, animationCount);
			}
			if (!elm._spSprite2.opening && !elm._spSprite2.closing && animationCount2 > 0) {
				animationCount2 = this.animation(elm._spSprite2, motionSPicture2, animationCount2);
			}

			//console.log("[1] x:" + elm._spSprite.x + " y:" + elm._spSprite.y + " opacity:" + elm._spSprite.opacity + " motion: " + motionSPicture + " opening: " + elm._spSprite.opening + " closing: " + elm._spSprite.closing + " scaleX: " + elm._spSprite.scale.x);
			//console.log("[2] x:" + elm._spSprite2.x + " y:" + elm._spSprite2.y + " opacity:" + elm._spSprite2.opacity + " motion: " + motionSPicture2 + " opening: " + elm._spSprite2.opening + " closing: " + elm._spSprite2.closing + " scaleX: " + elm._spSprite2.scale.x);
		}

		static refresh (sSprite, sPicture, sNumber) {
			sSprite.bitmap = null;
			sSprite.bitmap = ImageManager.loadPicture(sPicture.imageName);
			sSprite.showing = false;
			let calcScaleX = Number(sPicture.scaleX);
			let calcScaleY = Number(sPicture.scaleY);
			// 左右反転させる場合 (立ち絵2)
			if (sNumber == 2) calcScaleX *= Number(sPicture.reverse);
			// 画像が読み込まれたあとに実行
			sSprite.bitmap.addLoadListener(function() {
				if (Number(sPicture.origin) == 0) {
					// 左上原点
					if (sNumber == 1) {
						sSprite.x = Number(sPicture.x);
						sSprite.y = Number(sPicture.y);
						sSprite.originX = Number(sPicture.x);
						sSprite.originY = Number(sPicture.y);
					}
					if (sNumber == 2) {
						sSprite.x = Number(sPicture.x2);
						sSprite.y = Number(sPicture.y2);
						sSprite.originX = Number(sPicture.x2);
						sSprite.originY = Number(sPicture.y2);
					}
				} else {
					// 中央原点
					if (sNumber == 1) {
						sSprite.x = Number(sPicture.x) - (sSprite.width * calcScaleX / 100) / 2;
						sSprite.y = Number(sPicture.y) - (sSprite.height * calcScaleY / 100) / 2;
						sSprite.originX = Number(sPicture.x) - (sSprite.width * calcScaleX / 100) / 2;
						sSprite.originY = Number(sPicture.y) - (sSprite.height * calcScaleY / 100) / 2;
					}
					if (sNumber == 2) {
						sSprite.x = Number(sPicture.x2) - (sSprite.width * calcScaleX / 100) / 2;
						sSprite.y = Number(sPicture.y2) - (sSprite.height * calcScaleY / 100) / 2;
						sSprite.originX = Number(sPicture.x2) - (sSprite.width * calcScaleX / 100) / 2;
						sSprite.originY = Number(sPicture.y2) - (sSprite.height * calcScaleY / 100) / 2;
					}
				}
				// 切替効果
				if (sSprite.opacity == 0) {
					if (sNumber == 1) {
						if (transition == 0) sSprite.opacity = Number(sPicture.opacity);
						if (transition == 2) sSprite.x -= 30;
						if (transition == 3) sSprite.x += 30;
						if (transition == 4) sSprite.y += 30;
						if (transition == 5) sSprite.y -= 30;
					}
					if (sNumber == 2) {
						if (transition2 == 0) sSprite.opacity = Number(sPicture.opacity);
						if (transition2 == 2) sSprite.x -= 30;
						if (transition2 == 3) sSprite.x += 30;
						if (transition2 == 4) sSprite.y += 30;
						if (transition2 == 5) sSprite.y -= 30;
					}
				}
				sSprite.blendMode = Number(sPicture.blendMode);
				sSprite.setColorTone($gameSystem._StandingPictureTone ? $gameSystem._StandingPictureTone : [0, 0, 0, 0]);
				sSprite.setBlendColor([0, 0, 0, 0]);
				sSprite.scale.x = calcScaleX / 100;
				sSprite.scale.y = calcScaleY / 100;
				sSprite.showing = true;
			}.bind(this));
		}

		static fadeIn (sSprite, sPicture, sNumber) {
			if (!sSprite.showing) return;
			if (sSprite.opacity >= Number(sPicture.opacity)) {
				sSprite.opening = false;
				sSprite.opacity = Number(sPicture.opacity);
				return;
			}
			sSprite.opening = true;
			sSprite.closing = false;
			// 切替効果
			if (sSprite.originX > sSprite.x) sSprite.x += 2;
			if (sSprite.originX < sSprite.x) sSprite.x -= 2;
			if (sSprite.originY < sSprite.y) sSprite.y -= 2;
			if (sSprite.originY > sSprite.y) sSprite.y += 2;
			sSprite.opacity += Number(sPicture.opacity) / 15;
		}

		static fadeOut (sSprite, sPicture, sNumber) {
			if (sSprite.opacity == 0) {
				sSprite.closing = false;
				return;
			}
			sSprite.closing = true;
			if (!sPicture) {
				sSprite.opacity = 0;
				return;
			}
			sSprite.opacity -= Number(sPicture.opacity) / 15;
			// 切替効果
			if (sNumber == 1) {
				if (transition == 0) sSprite.opacity = 0;
				if (transition == 2 && sSprite.originX - 30 < sSprite.x) sSprite.x -= 2;
				if (transition == 3 && sSprite.originX + 30 > sSprite.x) sSprite.x += 2;
				if (transition == 4 && sSprite.originY + 30 > sSprite.y) sSprite.y += 2;
				if (transition == 5 && sSprite.originY - 30 < sSprite.y) sSprite.y -= 2;
			}
			if (sNumber == 2) {
				if (transition2 == 0) sSprite.opacity = 0;
				if (transition2 == 2 && sSprite.originX - 30 < sSprite.x) sSprite.x -= 2;
				if (transition2 == 3 && sSprite.originX + 30 > sSprite.x) sSprite.x += 2;
				if (transition2 == 4 && sSprite.originY + 30 > sSprite.y) sSprite.y += 2;
				if (transition2 == 5 && sSprite.originY - 30 < sSprite.y) sSprite.y -= 2;
			}
		}

		static animation (sSprite, sMotion, animationCount) {
			if (!sSprite.showing) return animationCount;
			if (sMotion == "yes") {
				if (animationCount > 12) {
					sSprite.y += 2;
				} else {
					sSprite.y -= 2;
				}
				animationCount -= 1;
			}
			if (sMotion == "yesyes") {
				if (animationCount > 36) {
					sSprite.y += 2;
				} else if (animationCount > 24) {
					sSprite.y -= 2;
				} else if (animationCount > 12) {
					sSprite.y += 2;
				} else {
					sSprite.y -= 2;
				}
				animationCount -= 1;
			}
			if (sMotion == "no") {
				if (animationCount > 18) {
					sSprite.x += 2;
				} else if (animationCount > 6) {
					sSprite.x -= 2;
				} else {
					sSprite.x += 2;
				}
				animationCount -= 1;
			}
			if (sMotion == "noslow") {
				if (animationCount > 36) {
					sSprite.x += 1;
				} else if (animationCount > 12) {
					sSprite.x -= 1;
				} else {
					sSprite.x += 1;
				}
				animationCount -= 1;
			}
			if (sMotion == "jump") {
				if (animationCount > 12) {
					sSprite.y -= 2;
				} else {
					sSprite.y += 2;
				}
				animationCount -= 1;
			}
			if (sMotion == "jumpjump") {
				if (animationCount > 36) {
					sSprite.y -= 2;
				} else if (animationCount > 24) {
					sSprite.y += 2;
				} else if (animationCount > 12) {
					sSprite.y -= 2;
				} else {
					sSprite.y += 2;
				}
				animationCount -= 1;
			}
			if (sMotion == "jumploop") {
				if (animationCount > 36) {
					sSprite.y -= 2;
				} else if (animationCount > 24) {
					sSprite.y += 2;
				}
				animationCount -= 1;
				if (animationCount == 0) animationCount = 48;
			}
			if (sMotion == "shake") {
				if (animationCount <= 2) {
					sSprite.x -= 2;
					animationCount += 1;
				} else if (animationCount <= 4) {
					sSprite.y -= 2;
					animationCount += 1;
				} else if (animationCount <= 6) {
					sSprite.x += 4;
					sSprite.y += 4;
					animationCount += 1;
				} else if (animationCount <= 8) {
					sSprite.y -= 2;
					animationCount += 1;
				} else if (animationCount == 9) {
					sSprite.x -= 2;
					animationCount += 1;
				} else if (animationCount == 10) {
					sSprite.x -= 2;
					animationCount = 0;
				}
			}
			if (sMotion == "shakeloop") {
				if (animationCount <= 2) {
					sSprite.x -= 1;
					animationCount += 1;
				} else if (animationCount <= 4) {
					sSprite.y -= 1;
					animationCount += 1;
				} else if (animationCount <= 6) {
					sSprite.x += 2;
					sSprite.y += 2;
					animationCount += 1;
				} else if (animationCount <= 8) {
					sSprite.y -= 1;
					animationCount += 1;
				} else if (animationCount <= 10) {
					sSprite.x -= 1;
					animationCount += 1;
				}
				if (animationCount > 10) animationCount = 1;
			}
			if (sMotion == "runleft") {
				sSprite.x -= 16;
				if (sSprite.x < -2000) animationCount = 0;
			}
			if (sMotion == "runright") {
				sSprite.x += 16;
				if (sSprite.x > 2000) animationCount = 0;
			}
			return animationCount;
		}
	}

	const _Scene_Map_update = Scene_Map.prototype.update;
	Scene_Map.prototype.update = function() {
		_Scene_Map_update.apply(this, arguments);
		ExStandingPicture.update(this);
	};

	const _Scene_Map_createDisplayObjects = Scene_Map.prototype.createDisplayObjects;
	Scene_Map.prototype.createDisplayObjects = function() {
		_Scene_Map_createDisplayObjects.apply(this, arguments);
		ExStandingPicture.create(this);
	};

	const _Scene_Battle_update = Scene_Battle.prototype.update;
	Scene_Battle.prototype.update = function() {
		_Scene_Battle_update.apply(this, arguments);
		ExStandingPicture.update(this);
	};

	const _Scene_Battle_createDisplayObjects = Scene_Battle.prototype.createDisplayObjects;
	Scene_Battle.prototype.createDisplayObjects = function() {
		_Scene_Battle_createDisplayObjects.apply(this, arguments);
		ExStandingPicture.create(this);
	};

	const _Window_Message_updateClose = Window_Message.prototype.updateClose;
	Window_Message.prototype.updateClose = function() {
		// ピクチャ消去判定
		if (this._closing && this.openness == 255) {
			showSPicture = false;
			showSPicture2 = false;
			motionSPicture = "";
			motionSPicture2 = "";
	    }
		_Window_Message_updateClose.apply(this, arguments);
	};

	const _Window_Message_startMessage = Window_Message.prototype.startMessage;
	Window_Message.prototype.startMessage = function() {
		let messageAllText = $gameMessage.allText();
		messageAllText = messageAllText.replace(/\\V\[(\d+)\]/gi, (_, p1) =>
			$gameVariables.value(parseInt(p1))
		);

		// 専用制御文字を取得 (\F[s])
		let sPictureNumber = null;
		let processEscapeNumber = messageAllText.match(/\\F\[(\w+)\]/);
		if (processEscapeNumber) {
			if (processEscapeNumber[1]) {
				sPictureNumber = processEscapeNumber[1];
			}
		}
		// 専用制御文字を取得 (\FF[s])
		let sPictureNumber2 = null;
		processEscapeNumber = messageAllText.match(/\\FF\[(\w+)\]/);
		if (processEscapeNumber) {
			if (processEscapeNumber[1]) {
				sPictureNumber2 = processEscapeNumber[1];
			}
		}
		// 専用制御文字を取得 (\M[s])
		let sPictureMotion = null;
		processEscapeNumber = messageAllText.match(/\\M\[(\w+)\]/);
		if (processEscapeNumber) {
			if (processEscapeNumber[1]) {
				sPictureMotion = processEscapeNumber[1];
			}
		}
		// 専用制御文字を取得 (\MM[s])
		let sPictureMotion2 = null;
		processEscapeNumber = messageAllText.match(/\\MM\[(\w+)\]/);
		if (processEscapeNumber) {
			if (processEscapeNumber[1]) {
				sPictureMotion2 = processEscapeNumber[1];
			}
		}
		// 専用制御文字を取得 (\AA[s])
		focusSPicture = null;
		processEscapeNumber = messageAllText.match(/\\AA\[(\w+)\]/);
		if (processEscapeNumber) {
			if (processEscapeNumber[1]) {
				focusSPicture = processEscapeNumber[1];
				// v2.1.0 \AA[F]、\AA[FF]、\AA[N]を置換
				if (focusSPicture == "F") focusSPicture = 1;
				if (focusSPicture == "FF") focusSPicture = 2;
				if (focusSPicture == "N") focusSPicture = 0;
			}
		}
		// 立ち絵1を更新
		if (sPictureNumber) {
			let sPicture = sPictureLists.find(function(item, index) {
				if (String(item.id) == sPictureNumber) return true;
			});
			spriteSPicture = sPicture;
			if (sPicture) {
				showSPicture = true;
				refSPicture = true;
			} else {
				showSPicture = false;
				refSPicture = false;
			}
			// 再生モーション定義
			motionSPicture = sPictureMotion ? sPictureMotion : "none";
			animationCount = animationFrame[motionSPicture];
		} else {
			showSPicture = false;
			motionSPicture = "";
		}
		// 立ち絵2を更新
		if (sPictureNumber2) {
			let sPicture2 = sPictureLists.find(function(item, index) {
				if (String(item.id) == sPictureNumber2) return true;
			});
			spriteSPicture2 = sPicture2;
			if (sPicture2) {
				showSPicture2 = true;
				refSPicture2 = true;
			} else {
				showSPicture2 = false;
				refSPicture2 = false;
			}
			// 再生モーション定義
			motionSPicture2 = sPictureMotion2 ? sPictureMotion2 : "none";
			animationCount2 = animationFrame[motionSPicture2];
		} else {
			showSPicture2 = false;
			motionSPicture2 = "";
		}

		_Window_Message_startMessage.apply(this, arguments);
	};

	const _Window_Base_convertEscapeCharacters = Window_Base.prototype.convertEscapeCharacters;
	Window_Base.prototype.convertEscapeCharacters = function(text) {
		// 立ち絵呼び出し用の制御文字(\V[n]内包)を追加
		text = text.replace(/\\F\[\\V\[(\d+)\]\]/gi, "");
		text = text.replace(/\\FF\[\\V\[(\d+)\]\]/gi, "");

		// 立ち絵呼び出し用の制御文字を追加
		text = text.replace(/\\F\[(\w+)\]/gi, "");
		text = text.replace(/\\FF\[(\w+)\]/gi, "");
		text = text.replace(/\\M\[(\w+)\]/gi, "");
		text = text.replace(/\\MM\[(\w+)\]/gi, "");
		text = text.replace(/\\AA\[(\w+)\]/gi, "");

		return _Window_Base_convertEscapeCharacters.call(this, text);
	};


	const _Scene_Boot_onDatabaseLoaded = Scene_Boot.prototype.onDatabaseLoaded;
	Scene_Boot.prototype.onDatabaseLoaded = function() {
		_Scene_Boot_onDatabaseLoaded.apply(this, arguments);

		this.loadLLStandingPictures();
	};

	Scene_Boot.prototype.loadLLStandingPictures = function() {
		if (!catheBootPicture) return;

		// 立ち絵画像を事前読み込み
		// const startTime = Date.now();
		sPictureLists.forEach(function(elm) {
			ImageManager.loadPicture(elm.imageName);
		});
		// const endTime = Date.now();

		// console.log("LL_StandingPicture: Cathe OK (" + (endTime - startTime) + "ms)");
	};
})();
