FROM node:20-alpine

ENV HOME=/home/app
ENV PATH=/home/app/.multica/bin:/usr/local/bin:$PATH
ENV MULTICA_CONFIG_DIR=/home/app/.multica

USER root

RUN apk update && apk add --no-cache \
    bash \
    curl \
    git \
    python3 \
    libc6-compat

WORKDIR /home/app

# Installation GLOBALE de l'agent
RUN npm install -g cursor-agent

# Installation du CLI Multica
RUN curl -fsSL https://raw.githubusercontent.com/multica-ai/multica/main/scripts/install.sh | bash

COPY start.sh /home/app/start.sh
RUN chmod +x /home/app/start.sh

CMD ["/bin/bash", "/home/app/start.sh"]
