# ==============================================================================
# 1. ÉTAPE DE BASE & DÉPENDANCES SYSTÈME
# ==============================================================================
FROM debian:bookworm-slim

ENV DEBIAN_FRONTEND=noninteractive
ENV PATH="/usr/local/bin:/usr/bin:/bin:/usr/local/sbin:/usr/sbin:/sbin"

RUN apt-get update && apt-get install -y --no-install-recommends \
    curl \
    ca-certificates \
    openssh-server \
    git \
    sudo \
    && rm -rf /var/lib/apt/lists/*

# ==============================================================================
# 2. CONFIGURATION DE L'AGENT ILLUSION (MOCK) POUR MULTICA
# ==============================================================================
# Crée un binaire virtuel pour valider le check du démon au démarrage
RUN echo '#!/bin/bash\n\
if [ "$1" = "--version" ] || [ "$1" = "-v" ]; then\n\
  echo "0.1.0"\n\
else\n\
  echo "Cursor Agent Mock active"\n\
fi\n\
exit 0' > /usr/local/bin/cursor-agent

RUN chmod +x /usr/local/bin/cursor-agent

# ==============================================================================
# 3. CONFIGURATION DE L'ENVIRONNEMENT APPLICATIF (user: app)
# ==============================================================================
RUN useradd -m -s /bin/bash app && echo "app ALL=(ALL) NOPASSWD:ALL" >> /etc/sudoers

WORKDIR /home/app

RUN mkdir -p /home/app/.multica && chown -R app:app /home/app

COPY --chown=app:app . .

RUN chmod +x /home/app/start.sh

# ==============================================================================
# 4. EXÉCUTION
# ==============================================================================
USER root

CMD ["/bin/bash", "/home/app/start.sh"]
