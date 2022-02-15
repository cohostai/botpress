FROM node:12.18.1 AS builder
ADD . /code
WORKDIR /code
RUN apt update && apt install -y git
RUN yarn
RUN NODE_OPTIONS=--max-old-space-size=4096 yarn build --prod
RUN yarn package --linux --prod

FROM ubuntu:20.04
COPY --from=builder /code/packages/bp/binaries /botpress
WORKDIR /botpress
RUN apt update && \
    apt install -y wget ca-certificates && \
    update-ca-certificates && \
    wget -O duckling https://s3.amazonaws.com/botpress-binaries/duckling-example-exe && \
    chmod +x duckling && \
    chmod +x bp && \
    chgrp -R 0 /botpress && \
    chmod -R g=u /botpress && \
    apt install -y tzdata && \
    ln -fs /usr/share/zoneinfo/UTC /etc/localtime && \
    dpkg-reconfigure --frontend noninteractive tzdata && \
    ./bp extract
ENV BP_MODULE_NLU_DUCKLINGURL=http://localhost:8000
ENV BP_IS_DOCKER=true
ENV LANG=C.UTF-8
EXPOSE 3000
CMD ./duckling & ./bp