###################################################
#                   Global Args                   #
###################################################
ARG BASE_PKG="libjpeg-turbo-dev libpng-dev libpq-dev libzip-dev tzdata npm sed"
ARG TEMP_PKG="git bash bash-completion nano"



###################################################
#                   composer_base                 #
###################################################
FROM node:20.11.0-alpine3.18 AS npm_base

ARG BASE_PKG
ARG TEMP_PKG
ARG BUILD_MODE

WORKDIR /app

##RUN  apk add --no-cache "node=v20.9.0" && \

RUN apk add --no-cache ${BASE_PKG} && \
        apk add --no-cache ${TEMP_PKG}

RUN addgroup -S npm \
        && adduser -S npm -G npm \
        && chown -R npm /app

USER npm
COPY --chown=npm package.json ./
#COPY --chown=npm .env.${BUILD_MODE} ./.env
#RUN echo ${DOCS_ENV_FILE} >> /app/.env

RUN npm install
COPY --chown=npm . .
RUN npm run docs:build:master
#npm run docs:preview


RUN echo ${BUILD_MODE:dev}
#RUN npm build:${BUILD_MODE:-dev}
#RUN NODE_OPTIONS="--max-old-space-size=4096" npm run generate:sentry
# RUN npm cache clean --force
###################################################
#                   web_server                    #
###################################################
FROM nginx:alpine AS docs_web_server

EXPOSE 80

ARG TEMP_PKG

WORKDIR /app

RUN  apk add --no-cache ${TEMP_PKG}

ENV TZ=Asia/Tehran
RUN cp /usr/share/zoneinfo/$TZ /etc/localtime && \
        echo $TZ > /etc/timezone

COPY .docker/production/nginx.conf /etc/nginx/templates/default.conf.template
COPY --chown=nginx --from=npm_base /app .
