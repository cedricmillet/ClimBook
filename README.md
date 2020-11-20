# Climbook

Progressive Web App intended for the management of a climbing gym.

* [Cahier des charges](https://docs.google.com/document/d/13sVdpy0Ea0QqceZefBAknCtqHe0utRDcX6KWkRcdkI4/)


## Lancement / Installation

Le projet est constitué de deux partie, un __client__ (build angular déservit via un serveur nginx) et un __serveur__ (service nodejs).
L'environnement de développement est lourd tant du côté client (1.21 Gb) que tu côté serveur (300 Mb). Les contraintes de développement sont lourdes mais les builds obtenus sont optimisés, minifiés et plutôt léger, en grand partie grâce aux Webpacks.

### Solution 1 (recommandée) - Ainsi, si vous souhaitez simplement lancer une instance du projet
* Pull des images depuis dockerhub
```
docker-compose pull
```
* Lancement (BDD+BACK+FRONT)
```
docker-compose up
```

**Une fois lancé, l'API est accessible depuis `http://localhost:8080/api/v1/` et le front depuis `http://localhost:4321/`.**

### Solution 2 - Générer vos images à partir des sources
/!\ 2 containers intermédiaires (builders) seront générés, pour un total de 1.5Gb
La génération des images à partir des sources **est un processus lourd et chronophage** qui télécharge
de nombreux modules et images lourdes (node=900Mo). Vous devez disposer d'une connexion internet haut débit et de temps à perdre...

```
//  Générer les images FRONTEND+BACKEND
docker-compose build

//  Lancer
docker-compose up

// !! Penser à supprimer les containers intermédiaires useless !!
```

**Une fois lancé, l'API est accessible depuis `http://localhost:8080/api/v1/` et le front depuis `http://localhost:4321/`.**

## Frontend
Angular 10.0.4


## Backend

Restful API with Express/Typescript/PostgreSql.

* `npm run doc` generate backend doc

## Variables d'environnement (facultatif)
* `API_PREFIX`
* `API_PORT`
* `API_DB_HOST`
* `API_DB_PORT`
* `API_DB_USER`
* `API_DB_PASS`
* `API_DB_DATABASE`