#!/bin/bash
# Forcer la détection absolue des répertoires binaires
export PATH="/home/app/node_modules/.bin:/home/app/.multica/bin:/usr/local/bin:/usr/bin:/bin:$PATH"

echo "=== Initialisation de la configuration Multica ==="
multica config set server_url https://api.multica.ai
multica config set app_url https://multica.ai

# Sécurité d'injection de la clé API si absente de l'environnement global
if [ -z "$MULTICA_API_KEY" ]; then
    echo "Forçage manuel de la clé API..."
    export MULTICA_API_KEY="mul_ff7f9760c2c55d65ae0b74b728fdc18b8049c08f"
fi

multica config set workspace_id "894029da-910d-4041-9587-7fb06536afc4"

echo "=== Alignement des liens binaires ==="
# On crée un lien direct dans le dossier système standard pour contourner les validations restrictives du démon
ln -sf /home/app/node_modules/.bin/cursor-agent /usr/local/bin/cursor-agent

echo "=== Vérification de l'agent ==="
which cursor-agent || echo "cursor-agent introuvable dans le PATH"

echo "=== Lancement du démon Multica ==="
multica daemon start

sleep 2
mkdir -p /home/app/.multica
touch /home/app/.multica/daemon.log

echo "=== Streaming des logs en direct ==="
exec tail -f /home/app/.multica/daemon.log
