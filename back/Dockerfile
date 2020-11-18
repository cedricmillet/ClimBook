#
#   docker build -t backend .
#
FROM mhart/alpine-node:12

# -----
# ----- TELECHARGEMENT DES MODULES 
# -----

# Creation du dossier backend
WORKDIR /tmpbackend
# copie du package.json dans le dossier temporaire
COPY package.json package-lock.json ./
# installation des modules
RUN npm install --only=prod


# -----
# ----- CREATION IMAGE A PARTIR D'ALPINE SLIM (35 Mo)
# -----
FROM mhart/alpine-node:slim-12 
WORKDIR /backend

# COPIE des modules téléchargés dans la première image
COPY --from=0 /tmpbackend .
# Copie du build depuis l'hote
COPY build/ .


# Lancement du container
CMD ["node", "main.js"]