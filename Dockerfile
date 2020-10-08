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
COPY ./package*.json ./
RUN npm install

# Copy entire repo into container
COPY . .

# Build everything
RUN npm run build

# Switch to the staging area
WORKDIR /staging

# Copy main executable to staging area
RUN mv /build/.nuxt . \
    && cp -r /build/node_modules ./node_modules \
    && cp /build/package.json . \
    && cp /build/*config.* . \
    && cp /build/.env* .

# Copy resources
RUN cp -r /build/public ./public

# ================================
# Run image
# ================================
FROM node:alpine

# Make sure all system packages are up to date.
RUN apk update \
    && apk upgrade \
    && rm -rf /var/cache/apk/*

# Create a nuxtjs user and group with /app as its home directory
# RUN useradd --user-group --create-home --system --skel /dev/null --home-dir /app nuxtjs
RUN addgroup --system nuxtjs \
    && adduser --system -k /dev/null --home /app nuxtjs

# Switch to the new home directory
WORKDIR /app

# Copy built executable and any staged resources from builder
COPY --from=builder --chown=nuxtjs:nuxtjs /staging /app

# Ensure all further commands run as the nuxtjs user
USER nuxtjs:nuxtjs

# Let Docker bind to port 3000
EXPOSE 3000

# Start the Nuxt service when the image is run, default to listening on 3000 in production environment
ENTRYPOINT ["npm"]
CMD ["start"]