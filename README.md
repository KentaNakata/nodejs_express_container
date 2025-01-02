# node.js express コンテナ 

## 使い方

- (`wsl`などの)Linuxシステムを導入

- `docker`を導入

- このプロジェクトをLinuxシステムが参照できる場所にクローン

- クローンした場所に`cd`で移動

- **イメージの構築・コンテナの構築・起動**
(--buildを付けると必ずイメージの再構築が行われる。-dを付けるとバックグラウンドでの起動になる)
```
docker compose up
docker compose up --build
docker compose up -d
docker compose up -d --build
```

- コンテナを起動できたか確認
```
docker ps
```

- ブラウザで`http://localhost:8080/`にアクセス

- **コンテナを停止・削除**
```
docker compose down
```