FROM node:20-alpine

ENV HOME=/home/app
ENV PATH=/home/app/node_modules/.bin:/home/app/.multica/bin:/usr/local/bin:$PATH
ENV MULTICA_CONFIG_DIR=/home/app/.multica

USER root

RUN apk update && apk add --no-cache \
    bash \
    curl \
    git \
    python3 \
    libc6-compat

WORKDIR /home/app

# Installation LOCALE de l'agent dans node_modules
RUN npm install cursor-agent

# Installation du CLI Multica
RUN curl -fsSL https://raw.githubusercontent.com/multica-ai/multica/main/scripts/install.sh | bash

# Récupération automatique de ton start.sh depuis GitHub
# REMPLACE l'URL ci-dessous par ton lien "Raw" GitHub (ex: https://raw.githubusercontent.com/...)
RUN curl -fsSL "TON_URL_GITHUB_RAW_VERS_START_SH" -o /home/app/start.sh && chmod +x /home/app/start.sh

# Droits d'exécution totaux pour éliminer les blocages
RUN chmod -R 777 /home/app

# On vide l'entrypoint Node pour conserver notre PATH au runtime
ENTRYPOINT []

CMD ["/bin/bash", "/home/app/start.sh"]
