FROM node:12.18.1 AS builder
ADD . /code
WORKDIR /code
RUN apt update && apt install -y git
RUN yarn cache clean --all
RUN yarn install
RUN NODE_OPTIONS=--max-old-space-size=4096 yarn build
RUN yarn package --linux --prod

FROM ubuntu:20.04
COPY --from=builder /code/packages/bp/binaries /botpress
WORKDIR /botpress
RUN apt update && \
    apt install -y ca-certificates git && \
    update-ca-certificates

RUN chmod +x bp && \
    chgrp -R 0 /botpress && \
    chmod -R g=u /botpress && \
    ./bp extract
CMD ./bp