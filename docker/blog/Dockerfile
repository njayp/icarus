FROM node:alpine AS build
WORKDIR /app
COPY . .
RUN npm i
RUN npm run build

FROM node:alpine
COPY --from=build /app/dist /dist
RUN npm install -g serve
ENTRYPOINT ["serve", "-s", "-l", "8080", "dist"]
