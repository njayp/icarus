FROM golang:alpine AS build
WORKDIR /app
COPY . .
RUN go build -o output/icarus ./cmd/main.go

FROM alpine
COPY --from=build /app/output/icarus /bin/icarus
COPY --from=build /app/files /files
ENTRYPOINT ["icarus"]
