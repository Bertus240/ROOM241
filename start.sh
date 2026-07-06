#!/bin/bash
# Forcer la détection absolue de cursor-agent et de multica
export PATH="/usr/local/bin:/usr/bin:/bin:/home/app/.multica/bin:$PATH"

echo "=== Initialisation de la configuration Multica ==="
multica config set server_url https://api.multica.ai
multica config set app_url https://multica.ai

# Sécurité si fly secrets a sauté
if [ -z "$MULTICA_API_KEY" ]; then
    echo "Forçage manuel de la clé API..."
    export MULTICA_API_KEY="mul_ff7f9760c2c55d65ae0b74b728fdc18b8049c08f"
fi

multica config set workspace_id "894029da-910d-4041-9587-7fb06536afc4"

echo "=== Vérification de l'agent ==="
which cursor-agent || echo "cursor-agent introuvable dans le PATH"

echo "=== Lancement du démon Multica ==="
multica daemon start

sleep 2
mkdir -p /home/app/.multica
touch /home/app/.multica/daemon.log

echo "=== Streaming des logs en direct ==="
exec tail -f /home/app/.multica/daemon.log
