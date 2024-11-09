#!/bin/bash

PUBLIC_DIR="./server/dist/public"

set -e

echo "Build web..."

pnpm install
pnpm build

mkdir -p $PUBLIC_DIR && cp -r ./dist/* $PUBLIC_DIR

echo "Build server..."

cd ./server

pnpm install
pnpm build

echo "Deploying..."

pnpm prod
