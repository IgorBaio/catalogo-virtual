# Stage 1: build the Go binary
FROM golang:1.22-alpine AS build
WORKDIR /app

# Download dependencies
COPY go.mod go.sum ./
RUN go mod download

# Copy the source and build
COPY . .
RUN go build -o catalogo-virtual

# Stage 2: create a minimal image
FROM alpine:latest
WORKDIR /app
COPY --from=build /app/catalogo-virtual ./catalogo-virtual

EXPOSE 8080
CMD ["./catalogo-virtual"]
