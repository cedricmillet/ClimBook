--
-- DROP DES EVENTUELLES TABLES EXISTANTES
--
DROP TABLE IF EXISTS chronos;
DROP TABLE IF EXISTS ascensions;
DROP TABLE IF EXISTS voies;
DROP TABLE IF EXISTS utilisateurs;
DROP TABLE IF EXISTS roles;
DROP TABLE IF EXISTS niveaux;
DROP EXTENSION IF EXISTS pgcrypto;
--
-- pgcrypto pour encoder les mot de passe
--
CREATE EXTENSION pgcrypto;


--
-- CREATION TABLE >> NIVEAUX
--
CREATE TABLE niveaux (
    id SERIAL PRIMARY KEY,
	difficulte INT, /* permet d'attribuer un score correspondant à un niveau */
    nom VARCHAR(50) NOT NULL,
    couleur VARCHAR(15) NOT NULL
);

--
-- CREATION TABLE >> ROLES
--
CREATE TABLE roles (
    id SERIAL PRIMARY KEY,
    role VARCHAR(50) NOT NULL
);

--
-- CREATION TABLE >> UTILISATEURS
--
CREATE TABLE utilisateurs (
    id SERIAL PRIMARY KEY,
    id_role INT,
    pseudo VARCHAR(50) NOT NULL,
    mdp VARCHAR(100) NOT NULL,
    email  VARCHAR(80) NOT NULL,
	CONSTRAINT email_chk CHECK (((email)::text ~* '^[0-9a-zA-Z._-]+@[0-9a-zA-Z._-]{2,}[.][a-zA-Z]{2,4}$'::text)),
	isabonne BOOLEAN, 
    CONSTRAINT cle_entrangere_role
        FOREIGN KEY(id_role) 
            REFERENCES roles(id)
            ON DELETE SET NULL
);


--
-- CREATION TABLE >> VOIES
--
CREATE TABLE voies (
    id SERIAL PRIMARY KEY,
	id_niveau INT,
	datev DATE DEFAULT CURRENT_DATE,
    nom VARCHAR(50) NOT NULL,
	CONSTRAINT cle_entrangere_niveau
        FOREIGN KEY(id_niveau) 
            REFERENCES niveaux(id)
            ON DELETE SET NULL
);


--
-- CREATION TABLE >> ASCENSIONS
--
CREATE TABLE ascensions (
    id SERIAL PRIMARY KEY,
	id_utilisateur INT,
	id_voie INT,
	datea DATE DEFAULT CURRENT_DATE,
    temps TIME NOT NULL,
	CONSTRAINT cle_entrangere_utilisateur
        FOREIGN KEY(id_utilisateur) 
            REFERENCES utilisateurs(id)
            ON DELETE SET NULL,
	CONSTRAINT cle_entrangere_voie
        FOREIGN KEY(id_voie) 
            REFERENCES voies(id)
            ON DELETE SET NULL
);


--
-- CREATION TABLE >> CHRONOS
--
CREATE TABLE chronos (
    id SERIAL PRIMARY KEY,
	id_ascension INT,
	id_utilisateur INT,
	CONSTRAINT cle_entrangere_utilisateur
        FOREIGN KEY(id_utilisateur) 
            REFERENCES utilisateurs(id)
            ON DELETE SET NULL,
	CONSTRAINT cle_entrangere_ascension
        FOREIGN KEY(id_ascension) 
            REFERENCES ascensions(id)
            ON DELETE SET NULL
);


--
-- AJOUT DES ROLES
--
INSERT INTO roles (id, role) VALUES(1, 'admin');
INSERT INTO roles (id, role) VALUES(2, 'client');

--
-- AJOUT DES UTILISATEURS
--
INSERT INTO utilisateurs (id,id_role, pseudo, mdp, email,isabonne) VALUES(1, 1, 'admin', crypt('admin', gen_salt('bf')), 'admin@domain.com',true);
INSERT INTO utilisateurs (id,id_role, pseudo, mdp, email,isabonne) VALUES(2, 2, 'client', crypt('client', gen_salt('bf')), 'client@domain.com',false);

--
-- AJOUT DES NIVEAUX
--
INSERT INTO niveaux (id,difficulte,nom,couleur) VALUES(1,3,'3A','blanc');
INSERT INTO niveaux (id,difficulte,nom,couleur) VALUES(2,4,'4A','vert');
INSERT INTO niveaux (id,difficulte,nom,couleur) VALUES(3,8,'5A','bleu');
INSERT INTO niveaux (id,difficulte,nom,couleur) VALUES(4,15,'6B','rouge');
INSERT INTO niveaux (id,difficulte,nom,couleur) VALUES(5,18,'7B','noir');
INSERT INTO niveaux (id,difficulte,nom,couleur) VALUES(6,25,'8A','violet');

--
-- AJOUT DES VOIES
--
INSERT INTO voies (id,id_niveau,nom) VALUES(1,6,'The Crux');
INSERT INTO voies (id,id_niveau,nom) VALUES(2,5,'The big Wall');
INSERT INTO voies (id,id_niveau,nom) VALUES(3,2,'Un nouvel espoir');


--
-- AJOUT DES ASCENSION
--
INSERT INTO ascensions (id,id_utilisateur,id_voie,temps) VALUES(1,2,2,'32:12.32');
INSERT INTO ascensions (id,id_utilisateur,id_voie,temps) VALUES(2,1,2,'32:12.0');

--
-- AJOUT DES VALIDATIONS
--
INSERT INTO chronos (id,id_ascension,id_utilisateur) VALUES(1,1,2);
INSERT INTO chronos (id,id_ascension,id_utilisateur) VALUES(2,2,1);