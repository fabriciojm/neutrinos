FROM ghcr.io/jdx/mise:2026.10.4 AS mise

FROM node:22-bookworm-slim

# Keep the base image lean, but include the small utilities Mise needs to fetch
# and unpack most tools. Compilers and language SDKs remain opt-in via Mise.
RUN apt-get update \
    && DEBIAN_FRONTEND=noninteractive apt-get install -y --no-install-recommends \
        ca-certificates \
        curl \
        git \
        unzip \
        xz-utils \
    && rm -rf /var/lib/apt/lists/*

# Copy only the Mise executable from its official image instead of carrying the
# full image (or a build toolchain) into this development container.
COPY --from=mise /usr/local/bin/mise /usr/local/bin/mise

# Shims make tools installed by Mise available in terminals and editor tasks
# without requiring shell-specific activation. `mise activate` can still be
# added to a personal shell rc file for advanced environment integrations.
ENV MISE_DATA_DIR=/home/node/.local/share/mise \
    MISE_CACHE_DIR=/home/node/.cache/mise \
    MISE_CONFIG_DIR=/home/node/.config/mise \
    MISE_STATE_DIR=/home/node/.local/state/mise \
    PATH=/home/node/.local/share/mise/shims:$PATH

RUN install -d -o node -g node \
        /home/node/.local/share/mise \
        /home/node/.local/state/mise \
        /home/node/.cache/mise \
        /home/node/.config/mise \
    && chown node:node /home/node/.local /home/node/.local/share /home/node/.local/state
