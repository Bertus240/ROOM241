FROM node:20-alpine

ENV HOME=/home/app
ENV PATH=/home/app/node_modules/.bin:/usr/local/bin:/home/app/.multica/bin:$PATH
ENV MULTICA_CONFIG_DIR=/home/app/.multica
ENV MULTICA_API_KEY=$MULTICA_TOKEN
ENV MULTICA_WORKSPACE_ID=$MULTICA_WORKSPACE_ID

USER root

RUN apk update && apk add --no-cache \
    bash \
    curl \
    git \
    python3 \
    libc6-compat

WORKDIR /home/app

# Installer cursor-agent
RUN npm install -g cursor-agent

RUN echo '#!/bin/bash\ncursor-agent "$@"' > /usr/local/bin/cursor-agent && chmod +x /usr/local/bin/cursor-agent

# Installer Multica
RUN curl -fsSL https://raw.githubusercontent.com/multica-ai/multica/main/scripts/install.sh | bash

# Copier ton script de démarrage
COPY start.sh /home/app/start.sh
RUN chmod +x /home/app/start.sh

# Lancer ton script au démarrage
CMD ["/bin/bash", "/home/app/start.sh"]
