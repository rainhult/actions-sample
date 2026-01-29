FROM mcr.microsoft.com/devcontainers/typescript-node:1-22-bullseye

# Amazon Corretto 21のインストール
RUN curl -fsSL https://apt.corretto.aws/corretto.key | gpg --dearmor -o /usr/share/keyrings/corretto-keyring.gpg && \
    echo "deb [signed-by=/usr/share/keyrings/corretto-keyring.gpg] https://apt.corretto.aws stable main" | tee /etc/apt/sources.list.d/corretto.list && \
    apt-get update && \
    apt-get install -y java-21-amazon-corretto-jdk && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/*

# JAVA_HOME環境変数の設定
ENV JAVA_HOME=/usr/lib/jvm/java-21-amazon-corretto
ENV PATH=$JAVA_HOME/bin:$PATH

# Javaのバージョン確認（オプション）
RUN java -version

# redis-cli用
RUN apt-get update && \
    apt-get install -y redis-tools

# PostgreSQL 16クライアントツール（psql, pg_dump等）のインストール
RUN apt-get update && \
    apt-get install -y wget gnupg2 && \
    wget --quiet -O - https://www.postgresql.org/media/keys/ACCC4CF8.asc | gpg --dearmor -o /usr/share/keyrings/postgresql-keyring.gpg && \
    echo "deb [signed-by=/usr/share/keyrings/postgresql-keyring.gpg] http://apt.postgresql.org/pub/repos/apt bullseye-pgdg main" | tee /etc/apt/sources.list.d/pgdg.list && \
    apt-get update && \
    apt-get install -y postgresql-client-16 && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/*

# GeminiCLIのインストール (Node.js版)
RUN npm install -g @google/gemini-cli

# playwrightに必要な依存関係のインストール
RUN npx playwright install-deps

# Playwrightのブラウザをインストール
RUN npx playwright install chromium firefox webkit

# Chromeブラウザのインストール
RUN npx playwright install chrome