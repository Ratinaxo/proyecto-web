FROM node:23-alpine

RUN apk add --no-cache bash libc6-compat curl
RUN npm install -g @angular/cli @ionic/cli
USER node
WORKDIR /usr/src/app
COPY . .

EXPOSE 8100 4200

CMD ["ionic", "serve", "--host", "0.0.0.0", "--port", "8100", "--poll=3000"]
