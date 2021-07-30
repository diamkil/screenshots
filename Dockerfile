FROM node:lts-alpine AS build

WORKDIR /build

COPY . /build/

RUN yarn install
RUN yarn build
RUN yarn install --production

FROM node:lts-alpine

WORKDIR /app

COPY --from=build /build/dist /app/dist
COPY --from=build /build/public /app/public
COPY --from=build /build/views /app/views
COPY --from=build /build/node_modules /app/node_modules

EXPOSE 8757

CMD node dist/app.js