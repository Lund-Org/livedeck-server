FROM node:11
LABEL MAINTAINER Lund

WORKDIR /app/

COPY ./package.json /app/package.json
COPY ./etc/scripts/entrypoint.sh /app/entrypoint.sh

ENTRYPOINT [ "/app/entrypoint.sh" ]
