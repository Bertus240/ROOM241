#!/bin/bash

export PATH="/home/app/node_modules/.bin:/usr/local/bin:/home/app/.multica/bin:$PATH"

echo "Logging into Multica..."
multica login --token "$MULTICA_TOKEN"

echo "Selecting workspace..."
multica workspace use "$MULTICA_WORKSPACE_ID"

echo "Starting daemon..."
multica daemon start

echo "Daemon started. Streaming logs..."
tail -f /home/app/.multica/daemon.log
