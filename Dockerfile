from ubuntu:22.04

COPY . .

RUN apt update 
RUN apt install -y git imagemagick nodejs npm

RUN npm install

cmd [ "bash", "-c", "npm run dev" ]