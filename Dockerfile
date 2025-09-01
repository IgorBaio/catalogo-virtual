# ---- Build ----
FROM node:20-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

# # ---- Runtime ----
# FROM nginx:1.27-alpine
# RUN rm -f /etc/nginx/conf.d/default.conf
# COPY nginx.subpath.conf /etc/nginx/conf.d/default.conf
# # coloca o build em /usr/share/nginx/html/catalogo-virtual
# COPY --from=build /app/dist /usr/share/nginx/html/catalogo-virtual
# HEALTHCHECK --interval=30s --timeout=3s CMD wget -qO- http://localhost/catalogo-virtual/ || exit 1
