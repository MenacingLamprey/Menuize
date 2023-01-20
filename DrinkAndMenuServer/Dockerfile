FROM node:18.13.0 as builder
WORKDIR /build
COPY package-lock.json package.json tsconfig.json ./
RUN npm i
COPY . .
RUN npm run build
RUN mv node_modules ./dist

# runtime stage
FROM node:18.13.0
RUN mkdir /build
WORKDIR /build/
COPY --from=builder --chown=node:node /build/dist .
CMD ["node", "index"]