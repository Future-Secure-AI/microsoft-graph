FROM node:24-alpine
WORKDIR /src

ARG NODE_ENV=production
ENV NODE_ENV=$NODE_ENV

ARG PORT=80
ENV PORT=$PORT

RUN addgroup -S appgroup && \
    adduser -S appuser -G appgroup

COPY package*.json ./

RUN --mount=type=cache,sharing=locked,target=/root/.npm \
    npm install -g tsx && \
    npm clean-install --only=$NODE_ENV --no-audit --no-fund

COPY ./src ./src

RUN chown -R appuser:appgroup /src

USER appuser

CMD ["tsx", "src/index.ts"]