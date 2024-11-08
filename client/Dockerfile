FROM node:18.10-slim
RUN mkdir /usr/src/app
WORKDIR /usr/src/app
COPY package*.json /usr/src/app/
RUN npm install
COPY ./ /usr/src/app
EXPOSE 4000
RUN npm run build:ssr
CMD npm run serve:ssr