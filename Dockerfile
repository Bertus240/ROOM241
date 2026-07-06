FROM node:20-slim

ENV HOME=/home/app
ENV PATH=/home/app/node_modules/.bin:/usr/local/bin:/home/app/.multica/bin:$PATH
ENV MULTICA_CONFIG_DIR=/home/app/.multica
ENV MULTICA_API_KEY=$MULTICA_TOKEN
ENV MULTICA_WORKSPACE_ID=$MULTICA_WORKSPACE_ID

USER root

# Dépendances système nécessaires
RUN apt-get update && apt-get install -y \
    curl \
    bash \
    git \
    python3 \
    libxcrypt-compat \
    libssl3 \
    libstdc++6 \
    libgcc1 \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /home/app

# Installation du vrai agent Cursor
RUN npm install -g cursor-agent

# Alias pour Multica
RUN echo '#!/bin/bash\ncursor-agent "$@"' > /usr/local/bin/cursor-agent && chmod +x /usr/local/bin/cursor-agent

# Installation du CLI Multica
RUN curl -fsSL https://raw.githubusercontent.com/multica-ai/multica/main/scripts/install.sh | bash

# Script de démarrage
RUN echo '#!/bin/bash\n\
export PATH="/home/app/node_modules/.bin:/usr/local/bin:/home/app/.multica/bin:$PATH"\n\
\n\
multica config set server_url https://api.multica.ai\n\
multica config set app_url https://multica.ai\n\
multica login --token "$MULTICA_TOKEN"\n\
\n\
echo \"Starting Multica daemon...\"\n\
multica daemon start\n\
\n\
mkdir -p /home/app/.multica\n\
touch /home/app/.multica/daemon.log\n\
\n\
echo \"Streaming logs...\"\n\
exec tail -f /home/app/.multica/daemon.log\n' \
> /home/app/start.sh && chmod +x /home/app/start.sh

CMD ["/bin/bash", "/home/app/start.sh"]
