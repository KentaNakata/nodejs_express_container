# dockerコマンド

## イメージ・コンテナの確認

全てのイメージを確認する
```
docker images
```
起動しているコンテナを確認する
```
docker ps
```
全てのコンテナを確認する
```
docker ps -a
```

用語
- **コンテナ**：仮想環境そのもの
- **イメージ**：コンテナを再現するための情報を記述したもの。コンテナを構築するための手順・操作を記録したものと考えればよい。イメージはコンテナより軽いので、コンテナそのものより持ち運びしやすい

## イメージ・コンテナの操作

Dockerfileによって**イメージを構築**する
(下記の例ではimという名前のイメージをカレントにあるDockerfileを使って構築する)
```
docker build --no-cache -t im .
```
イメージによって**コンテナを構築・起動**する
(下記の例ではconという名前のコンテナをimというイメージを使って構築・起動する。ホスト側の8080番ポートがコンテナ側の8000番ポートに接続される。-dを付けるとバックグラウンドでの起動になる。-dはコンテナ起動中の裏で操作できる代わりに標準出力やエラーログが見られないので本番用のオプションである)
```
docker run -p 8080:8000 --name con im
docker run -p 8080:8000 -d --name con im
```
**コンテナを起動**する
```
docker start con
```
起動中の**コンテナでコマンドを実行**する
(下記の例では下記の例ではconという名前のコンテナでlsを実行する)
```
docker exec -it con   ls
```
起動中の**コンテナを停止**する
```
docker stop con
```
**コンテナを削除**する
```
docker rm con
```
**イメージを削除**する
```
docker rmi im
```

## docker composeによるイメージ・コンテナの操作

カレントにあるdocker-compose.ymlによって**イメージの構築・コンテナの構築・起動**を全て行う
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

## イメージ・コンテナの一括操作

コンテナを全て削除する
```
docker stop $(docker ps -aq)
docker rm $(docker ps -aq)
```
イメージを全て削除する
```
docker rmi $(docker images -aq)
```
未使用のイメージ・コンテナ等を削除する
```
docker system prune -a --volumes
```
