FROM node:alpine

RUN apk add --nocache udev ttf-freefont chromium git
ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD true
ENV CHROMIUM_PATH /usr/bin/chromium-browser

WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install --production

COPY . .

EXPOSE 3000

CMD ["node", "--experimental-modules", "index.mjs"]
