# Common build stage
FROM node:16-slim as common-build-stage

COPY . ./app

WORKDIR /app

RUN npm ci --quiet

# Production build stage
FROM common-build-stage as production-build-stage

EXPOSE 3000

ENV NODE_ENV production

CMD ["npm", "run", "start"]

FROM common-build-stage as migrations-build-stage

ENV ENV NODE_ENV development

CMD ["npm", "run", "typeorm:run"]