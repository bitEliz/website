# ================================
# Build image
# ================================
FROM node:latest as builder

# Install OS updates
RUN export DEBIAN_FRONTEND=noninteractive DEBCONF_NONINTERACTIVE_SEEN=true \
    && apt-get -q update \
    && apt-get -q dist-upgrade -y \
    && rm -rf /var/lib/apt/lists/*

# Set up a build area
WORKDIR /build

# First just resolve dependencies.
COPY package.json .
COPY yarn.lock .

RUN yarn install

# Copy entire repo into container
COPY . .

# Build everything
RUN yarn build

# Switch to the staging area
WORKDIR /staging

# Copy main executable to staging area
RUN mv /build/.nuxt . \
    && cp -r /build/node_modules . \
    && cp /build/package.json . \
    && cp /build/nuxt.config.ts . \
    && cp /build/tsconfig.json .

# ================================
# Run image
# ================================
FROM node:slim

# Make sure all system packages are up to date.
# RUN apk update \
#     && apk upgrade \
#     && rm -rf /var/cache/apk/*
RUN export DEBIAN_FRONTEND=noninteractive DEBCONF_NONINTERACTIVE_SEEN=true \
    && apt-get -q update \
    && apt-get -q dist-upgrade -y \
    && rm -r /var/lib/apt/lists/*

# Switch to the new home directory
WORKDIR /app

# Copy built executable and any staged resources from builder
COPY --from=builder --chown=node:node /staging /app

# Ensure all further commands run as the nuxtjs user
USER node:node

# Let Docker bind to port 3000
EXPOSE 3000

# Set environment
ENV NODE_ENV=production
ENV HOST=0.0.0.0

# Start the Nuxt service when the image is run, default to listening on 3000 in production environment
CMD ["yarn", "start"]
