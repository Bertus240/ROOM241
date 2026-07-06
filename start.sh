# ==============================================================================
# 1. ÉTAPE DE BASE & DÉPENDANCES SYSTÈME
# ==============================================================================
FROM debian:bookworm-slim

# Évite les prompts interactifs pendant l'installation
ENV DEBIAN_FRONTEND=noninteractive
ENV PATH="/usr/local/bin:/usr/bin:/bin:/usr/local/sbin:/usr/sbin:/sbin"

# Installation des outils de base indispensables
RUN apt-get update && apt-get install -y --no-install-recommends \
    curl \
    ca-certificates \
    openssh-server \
    git \
    sudo \
    && rm -rf /var/lib/apt/lists/*

# ==============================================================================
# 2. INSTALLATION DE NODE.JS & CURSOR-AGENT (Le chaînon manquant)
# ==============================================================================
# Installation propre de Node.js 20.x via le dépôt officiel de NodeSource
RUN curl -fsSL https://deb.nodesource.com/setup_20.x | bash - \
    && apt-get install -y --no-install-recommends nodejs \
    && rm -rf /var/lib/apt/lists/*

# Installation globale de l'agent exigé par le démon Multica
RUN npm install -g @cursor/agent

# Sécurité : Forçage du lien symbolique pour s'assurer que le démon le trouve dans le PATH
RUN ln -sf $(which cursor-agent) /usr/local/bin/cursor-agent

# ==============================================================================
# 3. CONFIGURATION DE L'ENVIRONNEMENT APPLICATIF (user: app)
# ==============================================================================
# Création de l'utilisateur 'app' présent dans tes logs de boot
RUN useradd -m -s /bin/bash app && echo "app ALL=(ALL) NOPASSWD:ALL" >> /etc/sudoers

WORKDIR /home/app

# Création et sécurisation du dossier où Multica écrit ses logs (.multica/daemon.log)
RUN mkdir -p /home/app/.multica && chown -R app:app /home/app

# Copie de tes scripts locaux vers la machine
COPY --chown=app:app . .

# Rendre le script de démarrage exécutable
RUN chmod +x /home/app/start.sh

# ==============================================================================
# 4. EXÉCUTION
# ==============================================================================
# On bascule sur l'utilisateur root par défaut (ton log indique qu'init tourne en root)
USER root

# Lancement du script d'initialisation de ta machine Fly.io
CMD ["/bin/bash", "/home/app/start.sh"]
