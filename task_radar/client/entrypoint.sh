#!/bin/sh

# Install dependencies if node_modules is empty
if [ ! -d "node_modules" ] || [ -z "$(ls -A node_modules)" ]; then
  echo "Installing dependencies..."
  npm install
fi

exec npm run dev -- --host
