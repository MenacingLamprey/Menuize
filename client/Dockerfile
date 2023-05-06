FROM node:latest
WORKDIR /app
COPY . .
ARG VITE_DRINK_API_URL
ENV VITE_DRINK_API_URL=$DRINK_API_URL
RUN npm ci && npm run dev

FROM nginx:latest
COPY --from=build /app/dist /var/www/html/