#!/bin/bash
# On s'assure que tout est bien dans le PATH au runtime
export PATH="/home/app/.npm-global/bin:/home/app/.multica/bin:$PATH"

echo "=== Initialisation de la configuration Multica ==="
multica config set server_url https://api.multica.ai
multica config set app_url https://multica.ai

# FORCE LOGIN : On passe explicitement la clé API enregistrée dans tes secrets Fly.io
if [ -n "$MULTICA_API_KEY" ]; then
    echo "Authentification via la clé API détectée..."
    multica login --token "$MULTICA_API_KEY"
else
    echo "ERREUR : Aucune MULTICA_API_KEY trouvée dans les variables d'environnement !"
fi

# FORCE WORKSPACE : On s'assure que le démon sait exactement où se brancher
if [ -n "$MULTICA_WORKSPACE_ID" ]; then
    echo "Criblage du Workspace ID : $MULTICA_WORKSPACE_ID"
    multica config set workspace_id "$MULTICA_WORKSPACE_ID"
fi

echo "=== Lancement du démon Multica ==="
# On lance le démon au premier plan ou proprement pour générer les logs
multica daemon start

# Création du fichier de log si pas encore existant pour éviter un crash du tail
mkdir -p /home/app/.multica
touch /home/app/.multica/daemon.log

echo "=== Streaming des logs en direct ==="
exec tail -f /home/app/.multica/daemon.log
