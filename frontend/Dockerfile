# syntax=docker/dockerfile:1.6

#################################################
# Base image (Node 20, Alpine)
#################################################
FROM node:20-alpine AS base
WORKDIR /app
RUN apk add --no-cache libc6-compat

#################################################
# Dependencies layer
#################################################
FROM base AS deps
COPY package.json package-lock.json ./
RUN npm ci                         # frozen, reproducible install

#################################################
# Builder layer
#################################################
FROM base AS builder
COPY --from=deps /app/node_modules ./node_modules
COPY . .
ENV NEXT_TELEMETRY_DISABLED=1
RUN npm run build                  # generates .next/standalone + static

#################################################
# Runtime layer – smallest possible image
#################################################
FROM node:20-alpine
WORKDIR /app

# non-root user
RUN addgroup -S nodejs && adduser -S nextjs -G nodejs
USER nextjs

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
ENV PORT=3000
ENV HOSTNAME=0.0.0.0

# public assets + server bundle
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
# runtime deps that standalone server still needs
COPY --from=deps /app/node_modules ./node_modules

EXPOSE 3000
CMD ["node", "server.js"]
