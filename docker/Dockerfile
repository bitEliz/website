# ================================
# Build image
# ================================
FROM node:alpine as builder

# Install OS updates
RUN apk update \
    && apk upgrade \
    && rm -rf /var/cache/apk/*

# Install pnpm
RUN npm install -g pnpm

ARG BLOG_API_BASE_URL=http://127.0.0.1:8080
ARG BLOG_API_UID=__uid

ENV BLOG_API_BASE_URL=${BLOG_API_BASE_URL}
ENV BLOG_API_UID=${BLOG_API_UID}

# Set up a build area
WORKDIR /build

# First just resolve dependencies.
# This creates a cached layer that can be reused
# as long as your package
# files do not change.
COPY ./.npmrc ./
COPY ./pnpm-*.yaml ./
COPY ./package.json ./
COPY ./packages/core/package.json ./packages/core/package.json
RUN pnpm install

# Copy entire repo into container
COPY . .

# Planning build
RUN pnpm build:core

EXPOSE 5173

# Start the service when the image is run, default to listening on 5173 in production environment
ENTRYPOINT ["docker-entrypoint.sh", "packages/core/server"]
