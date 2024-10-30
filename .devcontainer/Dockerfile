# TypeScript Node Dev Container Image
FROM mcr.microsoft.com/devcontainers/typescript-node:20-bullseye

# Ensure container image builds without user prompts
ENV DEBIAN_FRONTEND=noninteractive

# Install base tools and other pre-reqs
RUN apt-get update -qq && apt-get install -yq curl gnupg git wget figlet make apt-transport-https \
ca-certificates lsb-release zsh software-properties-common jq
