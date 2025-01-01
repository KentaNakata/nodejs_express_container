# 既存のimageを挿入
FROM node:alpine

# ========== 挿入したimageへの追記 ==========

# 作業ディレクトリの変更
WORKDIR /usr/src/app

# package.json, package-lock.json をホストからコンテナへコピー
COPY package.json package-lock.json .
# package.json, package-lock.json に基づいて、依存するモジュールをインストール
RUN npm install
# 必要なファイルをホストからコンテナへコピー
COPY resource ./resource

# ポートの解放
EXPOSE 8000

# ========== コンテナ起動時の処理 ==========

# package.json の scripts.start に設定したコマンドを実行
CMD npm start
