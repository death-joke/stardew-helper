# syntax=docker/dockerfile:1

# --- Étape 1 : construction de l'application ---------------------------------------------------
# --platform=$BUILDPLATFORM : l'app est construite une seule fois, sans émulation ; seule la fine couche nginx change par architecture.
FROM --platform=$BUILDPLATFORM node:24-alpine AS build
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci
COPY . .
RUN npm run build

# --- Étape 2 : image finale, uniquement nginx + fichiers statiques ------------------------------
FROM nginx:1.27-alpine
COPY deploy/nginx.conf /etc/nginx/conf.d/default.conf
COPY deploy/security-headers.conf /etc/nginx/snippets/security-headers.conf
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s CMD wget -q -O /dev/null http://127.0.0.1/ || exit 1
