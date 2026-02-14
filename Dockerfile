# ── Stage 1: Build ─────────────────────────────────────────────────
FROM node:20-alpine AS build

WORKDIR /app

# Install dependencies (cached layer)
COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile --production=false

# Copy source and build
COPY . .
RUN yarn build

# ── Stage 2: Serve ─────────────────────────────────────────────────
FROM nginx:alpine

# Copy built assets
COPY --from=build /app/dist /usr/share/nginx/html

# Copy custom nginx config for SPA routing
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
