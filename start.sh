#!/bin/bash

# ==============================================================================
# 1. CONFIGURATION DE L'ENVIRONNEMENT & PATH
# ==============================================================================
# Force l'inclusion des dossiers de binaires globaux (Node/NPM/Agents)
export PATH="/usr/local/bin:/usr/bin:/bin:/usr/local/sbin:/usr/sbin:/sbin:$PATH"

# Configuration des URLs de la plateforme Multica
export server_url="https://api.multica.ai"
export app_url="https://multica.ai"
export workspace_id="894029da-910d-4041-9587-7fb06536afc4"

echo "=== Initialisation de la configuration Multica ==="
echo "Set server_url = $server_url"
echo "Set app_url = $app_url"
echo "Set workspace_id = $workspace_id"

# ==============================================================================
# 2. VÉRIFICATION DES PRÉREQUIS AVANT LANCEMENT
# ==============================================================================
echo "=== Alignement des liens binaires ==="

# Double vérification de la présence de l'agent requis dans le PATH
if command -v cursor-agent >/dev/null 2>&1; then
    echo "Vérification de l'agent : cursor-agent trouvé à l'emplacement $(command -v cursor-agent)"
else
    echo "CRITICAL: cursor-agent introuvable dans le PATH actuel."
    echo "PATH actuel : $PATH"
    # Secours : si jamais le lien symbolique a sauté, on tente de le recréer à la volée
    if [ -f "/usr/bin/cursor-agent" ]; then
        ln -sf /usr/bin/cursor-agent /usr/local/bin/cursor-agent
    fi
fi

# ==============================================================================
# 3. LANCEMENT DU DÉMON MULTICA
# ==============================================================================
echo "=== Lancement du démon Multica ==="

# Assure-toi que les répertoires de logs existent et appartiennent au bon user
mkdir -p /home/app/.multica
touch /home/app/.multica/daemon.log

# Exécution du démon Multica (Remplace 'multica-daemon' par le nom exact de ton binaire démon si nécessaire)
# On le lance en tâche de fond pour pouvoir streamer les logs juste après
if command -v multica-daemon >/dev/null 2>&1; then
    multica-daemon start --workspace $workspace_id >> /home/app/.multica/daemon.log 2>&1 &
else
    # Si le démon est appelé via un script d'initialisation spécifique ou un autre binaire :
    echo "Démarrage via le service d'initialisation..."
    # Intègre ici la commande exacte qui lance ton binaire démon original
fi

# Laisse le temps au démon de s'initialiser (2 à 3 secondes)
sleep 3

# ==============================================================================
# 4. STREAMING DES LOGS ET MAINTIEN DE LA VM EN VIE
# ==============================================================================
echo "=== Streaming des logs en direct ==="

# On utilise 'tail -f' sur le fichier log. 
# C'est ce qui maintient le conteneur/VM Fly.io en vie au premier plan (PID 1)
tail -f /home/app/.multica/daemon.log
