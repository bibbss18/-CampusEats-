FROM node:22.20.0-alpine3.22
RUN apk add --no-cache git
RUN corepack enable && corepack prepare yarn@1.22.22 --activate
ENV COREPACK_ENABLE_DOWNLOAD_PROMPT=0
ENV YARN_IGNORE_NODE=1

WORKDIR /campuseats/api
CMD ["yarn", "dev"]