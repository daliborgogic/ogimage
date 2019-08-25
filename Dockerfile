FROM node:alpine

RUN apk add --no-cache udev ttf-freefont chromium git
ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD true
ENV CHROMIUM_PATH /usr/bin/chromium-browser

WORKDIR /app
COPY . .
RUN npm ci --production

EXPOSE 3000

CMD ["node", "--experimental-modules", "index.mjs"]
