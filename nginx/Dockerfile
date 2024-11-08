FROM nginx:1.13.0-alpine
COPY default.conf /etc/nginx/conf.d/default.conf
COPY nginx.conf /etc/nginx/nginx.conf
COPY .htpasswd /etc/nginx/.htpasswd 

RUN mkdir -p /data/nginx/cache/www
RUN chown nginx /data/nginx/cache/www
RUN chmod 700 /data/nginx/cache/www

RUN mkdir -p /data/nginx/cache/leasing
RUN chown nginx /data/nginx/cache/leasing
RUN chmod 700 /data/nginx/cache/leasing

RUN mkdir -p /data/nginx/cache/entreprise
RUN chown nginx /data/nginx/cache/entreprise
RUN chmod 700 /data/nginx/cache/entreprise

RUN mkdir -p /data/nginx/cache/occasion
RUN chown nginx /data/nginx/cache/occasion
RUN chmod 700 /data/nginx/cache/occasion

RUN apk add --no-cache nginx-mod-http-perl=1.10.3-r1
EXPOSE 80