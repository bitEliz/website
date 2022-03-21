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

ARG VITE_API_SERVER
ENV VITE_API_USER=$VITE_API_USER

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
FROM nginx:alpine

# Make sure all system packages are up to date.
RUN apk update \
    && apk upgrade \
    && rm -rf /var/cache/apk/*
# RUN export DEBIAN_FRONTEND=noninteractive DEBCONF_NONINTERACTIVE_SEEN=true \
#     && apt-get -q update \
#     && apt-get -q dist-upgrade -y \
#     && rm -r /var/lib/apt/lists/*

# Copy built executable and any staged resources from builder
COPY --from=builder /build/dist /usr/share/nginx/html

# Start the service when the image is run, default to listening on 80 in production environment
CMD ["nginx", "-g", "daemon off;"]
