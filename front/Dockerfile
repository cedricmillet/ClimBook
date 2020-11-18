#
#   docker build -t frontend .
#   docker run -p 9090:80 frontend
#

# base image
FROM nginx:1.16.0-alpine

# COPÏE du build dans le container
COPY dist/front/ /usr/share/nginx/html

# Exposer le port 80
EXPOSE 80

# Lancer le serveur web
CMD ["nginx", "-g", "daemon off;"]