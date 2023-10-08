FROM node:alpine

RUN apk --no-cache add ffmpeg

WORKDIR /app

COPY . .

RUN npm install

EXPOSE 3000

CMD ["npm", "run", "start"]
