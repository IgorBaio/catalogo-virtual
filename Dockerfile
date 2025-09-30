# ---- Builder (Debian/glibc) ----
FROM node:20-bullseye-slim AS build
WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .
ENV NODE_ENV=production
RUN npm run build

# ---- Runtime (Nginx) ----
FROM nginx:1.27-alpine
# Remove o default e usa uma config para servir em /catalogo-virtual/
RUN rm -f /etc/nginx/conf.d/default.conf
COPY nginx.subpath.conf /etc/nginx/conf.d/default.conf

# Copia a build para o subpath
COPY --from=build /app/dist /usr/share/nginx/html/catalogo-virtual

HEALTHCHECK --interval=30s --timeout=3s CMD wget -qO- http://localhost/catalogo-virtual/ || exit 1
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
