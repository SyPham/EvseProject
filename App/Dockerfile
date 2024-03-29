### STAGE 1: Build ###

# We label our stage as 'builder'
FROM node:14.17.0 as builder

COPY package.json ./

COPY yarn.lock ./

## Storing node modules on a separate layer will prevent unnecessary npm installs at each build
RUN yarn cache clean && yarn install --network-timeout 1000000 && mkdir /evse && cp -R ./node_modules ./evse

WORKDIR /evse

COPY . .

## Build the angular app in production mode and store the artifacts in dist folder
RUN yarn prod


### STAGE 2: Setup ###

FROM nginx

## Copy our default nginx config
COPY default.conf /etc/nginx/conf.d/

## Remove default nginx website
RUN rm -rf /usr/share/nginx/html/*

## From 'builder' stage copy over the artifacts in dist folder to default nginx public folder
COPY --from=builder /evse/dist /usr/share/nginx/html

CMD ["nginx", "-g", "daemon off;"]
