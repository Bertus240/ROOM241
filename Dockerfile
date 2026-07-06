FROM node:20-slim

ENV HOME=/home/app
ENV PATH=/home/app/node_modules/.bin:/home/app/.multica/bin:/usr/local/bin:$PATH
ENV MULTICA_CONFIG_DIR=/home/app/.multica

USER root

# Installation des dépendances sur base Debian (apt-get au lieu de apk)
RUN apt-get update && apt-get install -y \
    curl \
    bash \
    git \
    python3 \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /home/app

# Installation LOCALE de l'agent
RUN npm install cursor-agent

# Installation du CLI Multica
RUN curl -fsSL https://raw.githubusercontent.com/multica-ai/multica/main/scripts/install.sh | bash

# Intégration du script start.sh local
COPY start.sh /home/app/start.sh
RUN chmod +x /home/app/start.sh

# Droits d'exécution totaux
RUN chmod -R 777 /home/app

# On vide l'entrypoint Node
ENTRYPOINT []

CMD ["/bin/bash", "/home/app/start.sh"]
