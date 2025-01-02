# node.js express コンテナ 

## 使い方

- (`wsl`などの)Linuxシステムを導入
- `docker`を導入
- このプロジェクトをLinuxシステムが参照できる場所にクローン
- クローンした場所に`cd`で移動
- カレントにあるdocker-compose.ymlによって**イメージの構築・コンテナの構築・起動**を全て行う
(--buildを付けると必ずイメージの再構築が行われる。-dを付けるとバックグラウンドでの起動になる)
```
docker compose up
docker compose up --build
docker compose up -d
docker compose up -d --build
```
上記コマンドで起動した**コンテナを停止・削除**する
```
docker compose down
```