# ================================
# Build image
# ================================
FROM node:alpine as builder

# Install OS updates
RUN apk update \
    && apk upgrade \
    && rm -rf /var/cache/apk/*

# Set up a build area
WORKDIR /build

# First just resolve dependencies.
COPY package.json .
COPY yarn.lock .

RUN yarn

# Copy entire repo into container
COPY . .

# Build everything
RUN yarn build


# ================================
# Run image
# ================================
FROM node:alpine

# Make sure all system packages are up to date.
RUN apk update \
    && apk upgrade \
    && rm -rf /var/cache/apk/*

# Copy built executable and any staged resources from builder
COPY --from=builder /build/.output /app

# Start the service when the image is run, default to listening on 3000 in production environment

ENV NITRO_PORT=5173
EXPOSE ${NITRO_PORT}

ENTRYPOINT ["node", "/app/server/index.mjs"]