FROM node:14.15-alpine As builder
ENV NODE_ENV build
WORKDIR /home/node
COPY . /home/node
RUN npm install && npm run build

FROM node:14.15-alpine 
ENV NODE_ENV production
WORKDIR /home/node
COPY --from=builder /home/node/package*.json /home/node/
COPY --from=builder /home/node/dist/ /home/node/dist/
RUN npm install
CMD ["node", "dist/main"]
