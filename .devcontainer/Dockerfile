FROM mcr.microsoft.com/devcontainers/base:ubuntu

# Install additional dependencies
RUN apt-get update && export DEBIAN_FRONTEND=noninteractive \
    && apt-get -y install --no-install-recommends \
        curl \
        git \
        build-essential \
        ca-certificates \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*

# Switch to vscode user
USER vscode
WORKDIR /home/vscode

# Install mise
RUN curl https://mise.run | sh
ENV PATH="/home/vscode/.local/bin:$PATH"

# Add mise to shell profile
RUN echo 'eval "$(mise activate bash)"' >> ~/.bashrc
RUN echo 'eval "$(mise activate zsh)"' >> ~/.zshrc

WORKDIR /workspaces/yumechi.github.io
