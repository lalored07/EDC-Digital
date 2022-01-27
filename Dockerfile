FROM nginx

ENV NODE_ENV=developer

## Copy Angular App Build to Ngnix Source
COPY ./dist/out/ /usr/share/nginx/html

## Copy Custom Nginx Configuration
COPY nginx.conf /etc/nginx/nginx.conf

EXPOSE 8080

## Init Nginx Server
CMD ["nginx", "-g", "daemon off;"]
