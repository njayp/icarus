FROM node:alpine AS build
WORKDIR /app
COPY . .
RUN npm i
RUN npm run build

FROM node:alpine
RUN npm install -g serve
COPY --from=build /app/dist /dist
ENTRYPOINT ["serve", "-s", "-l", "8080", "/dist"]
