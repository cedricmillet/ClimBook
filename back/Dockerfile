#
#   docker build -t backend .
#
FROM mhart/alpine-node:12 as builder

# -----
# ----- TELECHARGEMENT DES MODULES 
# -----

# Creation du dossier backend
WORKDIR /tmpbackend
# copie du package.json dans le dossier temporaire
COPY package.json package-lock.json tsconfig.json ./
# copie du dossier src
COPY ./src ./src/
# installation des modules pour le  build
RUN npm install 

# build dans un dossier ./build
RUN npm run build && \
    cp package.json package-lock.json ./build && \
    cp -r node_modules/ ./build/node_modules && \
    ls

# -----
# ----- CREATION IMAGE A PARTIR D'ALPINE SLIM (35 Mo)
# -----
FROM mhart/alpine-node:slim-12 
WORKDIR /backend

# COPIE des modules téléchargés dans la première image
COPY --from=builder /tmpbackend/build/ .

RUN echo "contenu du projet: " && ls
# Copie du build depuis l'hote
#COPY build/ .
# COPY --from=0 /tmpbackend/build/ .



# Lancement du container
CMD ["node", "src/main.js"]