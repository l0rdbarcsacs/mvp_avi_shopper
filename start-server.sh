#!/bin/sh

echo "🚀 Iniciando AVI Shopper MVP con configuración para ngrok..."

# Variables de entorno para forzar configuración y deshabilitar host checking
export VITE_HOST="0.0.0.0"
export VITE_PORT="5173"
export DANGEROUSLY_DISABLE_HOST_CHECK="true"
export WDS_SOCKET_HOST="0.0.0.0"
export VITE_ALLOWED_HOSTS="all"

# Iniciar con bypass completo de host checking
npx vite --host 0.0.0.0 --port 5173 --force
