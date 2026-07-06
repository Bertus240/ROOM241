FROM node:20-alpine

ENV HOME=/home/app
ENV PATH=/home/app/.npm-global/bin:/home/app/.multica/bin:$PATH
ENV MULTICA_CONFIG_DIR=/home/app/.multica

# Configuration de npm pour installer dans le home de l'app
ENV NPM_CONFIG_PREFIX=/home/app/.npm-global

USER root

RUN apk update && apk add --no-cache \
    bash \
    curl \
    git \
    python3 \
    libc6-compat

WORKDIR /home/app

# Installation propre de cursor-agent
RUN npm install -g cursor-agent

# Installer Multica
RUN curl -fsSL https://raw.githubusercontent.com/multica-ai/multica/main/scripts/install.sh | bash

COPY start.sh /home/app/start.sh
RUN chmod +x /home/app/start.sh

CMD ["/bin/bash", "/home/app/start.sh"]
