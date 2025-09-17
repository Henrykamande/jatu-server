# syntax = docker/dockerfile:1

ARG NODE_VERSION=16
FROM node:${NODE_VERSION}-bullseye-slim AS base
LABEL fly_launch_runtime="Node.js"
WORKDIR /app

# Final image is production; we'll override during build
ENV NODE_ENV=production
ARG YARN_VERSION=1.22.21
RUN npm install -g yarn@${YARN_VERSION} --force

# ---------------- Build stage ----------------
FROM base AS build
# Ensure devDependencies (backpack/webpack) install
ENV NODE_ENV=development

# Build toolchain for native modules (e.g., sharp) & node-gyp
RUN apt-get update -qq && \
    apt-get install --no-install-recommends -y \
      python3 make g++ pkg-config && \
    rm -rf /var/lib/apt/lists/*

# Install ALL deps (incl dev)
COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile --production=false

# Copy source and build
COPY . .
RUN yarn run build

# ---------------- Runtime stage ----------------
FROM base AS runtime
WORKDIR /app

# Install only production deps
COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile --production=true && yarn cache clean

# Bring in build output and runtime assets only
COPY --from=build /app/build ./build
COPY --from=build /app/bin ./bin
COPY --from=build /app/public ./public
COPY --from=build /app/views ./views
# (add any other runtime dirs/files your app needs)

EXPOSE 3000
# If your app starts via Express entry:
CMD ["yarn","run","start"]
# If you run the Backpack bundle instead, use:
# CMD ["node","build/main.js"]
