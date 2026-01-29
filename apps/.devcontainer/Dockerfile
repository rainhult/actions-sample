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

# Playwrightに必要なシステム依存関係のインストール
RUN apt-get update && apt-get install -y \
    libnss3 \
    libnspr4 \
    libatk1.0-0 \
    libatk-bridge2.0-0 \
    libcups2 \
    libdrm2 \
    libdbus-1-3 \
    libxkbcommon0 \
    libxcomposite1 \
    libxdamage1 \
    libxfixes3 \
    libxrandr2 \
    libgbm1 \
    libasound2 \
    libpango-1.0-0 \
    libcairo2 \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*

# e2eのpackage.jsonをコピーしてPlaywrightをインストール
COPY e2e/package.json /tmp/e2e-package.json
RUN cd /tmp && \
    npm install --prefix /tmp/e2e @playwright/test@^1.58.0 && \
    /tmp/e2e/node_modules/.bin/playwright install chromium && \
    rm -rf /tmp/e2e-package.json /tmp/e2e