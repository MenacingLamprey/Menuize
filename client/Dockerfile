FROM node:latest
WORKDIR /app
COPY . .
ARG REACT_APP_DRINK_API_URL
ENV REACT_APP_DRINK_API_URL=$DRINK_API_URL
RUN npm ci && npm run build

FROM nginx:latest
COPY --from=0 /app/build /usr/share/nginx/html