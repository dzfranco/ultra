FROM node:10.18.0

# Create app directory
RUN mkdir -p /var/www
RUN mkdir -p /var/www/logs
WORKDIR /var/www

EXPOSE 3000 3001
CMD [ "yarn", "start:dev"]