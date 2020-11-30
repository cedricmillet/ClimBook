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
DROP FUNCTION IF EXISTS getniveaumoyen;
DROP FUNCTION IF EXISTS gettempsmoyen;
DROP FUNCTION IF EXISTS getbestgrimp;
DROP FUNCTION IF EXISTS getnombreval;
--
-- pgcrypto pour encoder les mot de passe
--
CREATE EXTENSION pgcrypto;


/*-----------------------------------------
                TABLES
-----------------------------------------*/

--
-- CREATION TABLE >> NIVEAUX
--
CREATE TABLE niveaux (
    id SERIAL PRIMARY KEY,
	difficulte INT,
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

/*-----------------------------------------
                POPULATE DES TABLES
-----------------------------------------*/
--
-- AJOUT DES ROLES
--
INSERT INTO roles (id, role) VALUES(1, 'admin');
INSERT INTO roles (id, role) VALUES(2, 'client');

-- AJOUT DES UTILISATEURS
--
INSERT INTO utilisateurs (id,id_role, pseudo, mdp, email,isabonne) VALUES(1, 1, 'admin', crypt('000000', gen_salt('bf')), 'admin@domain.com',true);
INSERT INTO utilisateurs (id,id_role, pseudo, mdp, email,isabonne) VALUES(2, 2, 'client', crypt('123456', gen_salt('bf')), 'client@domain.com',false);
INSERT INTO utilisateurs (id,id_role, pseudo, mdp, email,isabonne) VALUES(3, 1, 'cedric', crypt('000000', gen_salt('bf')), 'cedric@domain.com',true);
INSERT INTO utilisateurs (id,id_role, pseudo, mdp, email,isabonne) VALUES(4, 1, 'tom', crypt('000000', gen_salt('bf')), 'tom@domain.com',true);
INSERT INTO utilisateurs (id,id_role, pseudo, mdp, email,isabonne) VALUES(5, 1, 'arnaud', crypt('000000', gen_salt('bf')), 'arnaud@domain.com',true);
INSERT INTO utilisateurs (id,id_role, pseudo, mdp, email,isabonne) VALUES(6, 1, 'jean', crypt('000000', gen_salt('bf')), 'jean@domain.com',true);
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


-- AJOUT DES ASCENSION
--
INSERT INTO ascensions (id,id_utilisateur,id_voie,temps) VALUES(1,2,1,'32:12.32');
INSERT INTO ascensions (id,id_utilisateur,id_voie,temps) VALUES(2,2,2,'39:12.48');
INSERT INTO ascensions (id,id_utilisateur,id_voie,temps) VALUES(3,2,3,'37:12.48');

INSERT INTO ascensions (id,id_utilisateur,id_voie,temps) VALUES(4,3,1,'32:10.2');
INSERT INTO ascensions (id,id_utilisateur,id_voie,temps) VALUES(5,3,2,'36:11.2');
INSERT INTO ascensions (id,id_utilisateur,id_voie,temps) VALUES(6,3,3,'32:10.2');

INSERT INTO ascensions (id,id_utilisateur,id_voie,temps) VALUES(7,4,1,'38:10.2');
INSERT INTO ascensions (id,id_utilisateur,id_voie,temps) VALUES(8,4,2,'41:20.7');
INSERT INTO ascensions (id,id_utilisateur,id_voie,temps) VALUES(9,4,3,'55:10.4');

INSERT INTO ascensions (id,id_utilisateur,id_voie,temps) VALUES(10,5,1,'41:10.6');
INSERT INTO ascensions (id,id_utilisateur,id_voie,temps) VALUES(11,5,2,'10:10.1');
INSERT INTO ascensions (id,id_utilisateur,id_voie,temps) VALUES(12,5,3,'20:10.7');

INSERT INTO ascensions (id,id_utilisateur,id_voie,temps) VALUES(13,6,1,'16:10.9');
INSERT INTO ascensions (id,id_utilisateur,id_voie,temps) VALUES(14,6,2,'36:40.5');
INSERT INTO ascensions (id,id_utilisateur,id_voie,temps) VALUES(15,6,3,'26:10.1');



--
-- AJOUT DES VALIDATIONS
--
INSERT INTO chronos (id,id_ascension,id_utilisateur) VALUES(1,1,1);
INSERT INTO chronos (id,id_ascension,id_utilisateur) VALUES(2,2,1);
INSERT INTO chronos (id,id_ascension,id_utilisateur) VALUES(3,7,6);
INSERT INTO chronos (id,id_ascension,id_utilisateur) VALUES(4,5,4);
INSERT INTO chronos (id,id_ascension,id_utilisateur) VALUES(5,3,5);
INSERT INTO chronos (id,id_ascension,id_utilisateur) VALUES(6,6,6);


/*-----------------------------------------
                FONCTIONS
-----------------------------------------*/


-- Retourne le nombre de validations pour une ascencion donnée
CREATE OR REPLACE FUNCTION
   getnombreval(id_a INTEGER)
RETURNS bigint AS $$
    SELECT COUNT(*) FROM chronos
    WHERE chronos.id_ascension = id_a
    
$$ LANGUAGE SQL;

/* SELECT * FROM getNombreVal(2) AS (Nb INTEGER);*/

-- Retourne le niveau moyen d'un utilisateur donné
CREATE OR REPLACE FUNCTION getniveaumoyen(idTestUtilisateur Integer) RETURNS record AS $$
	SELECT AVG(difficulte) FROM Niveaux WHERE Niveaux.id IN (
			SELECT id_niveau FROM Voies WHERE Voies.id IN ( 
				SELECT id_voie FROM Ascensions WHERE Ascensions.id_Utilisateur = idTestUtilisateur));

$$ LANGUAGE SQL;

/*
SELECT * FROM getNiveauMoyen(2) AS (Moyenne Integer);*/ --L'utilisateur 2 à effectué 2 ascension de difficultés 3 et 8, doonc retourne 5
	
-- Retourne le temps moyen sur une voie donnée
CREATE OR REPLACE FUNCTION gettempsmoyen(idTestVoie Integer) RETURNS interval AS $$		
	SELECT AVG(temps) FROM ascensions,voies
	WHERE voies.id = idTestVoie
	AND ascensions.id_voie = voies.id	
$$ LANGUAGE SQL;

/*SELECT getTempsMoyen(1)*/

--  Calcule et retourne les 5 meilleurs grimpeurs d'une voie donnée
CREATE OR REPLACE FUNCTION
   getbestgrimp(id_v INTEGER)
RETURNS SETOF record AS $$
    SELECT utilisateurs.id , utilisateurs.pseudo, ascensions.temps FROM utilisateurs, ascensions, voies
    WHERE voies.id = id_v
    AND ascensions.id_voie = voies.id
    AND utilisateurs.id = ascensions.id_utilisateur
    ORDER BY ascensions.temps ASC LIMIT 5
    
$$ LANGUAGE SQL;

/*
SELECT * FROM getBestGrimp(1) AS (user_id INTEGER, pseudo VARCHAR, chrono TIME);*/

-- Retourne le classement général, la liste des utilisateurs et leur score dasn le classement
-- classement trié par nbre de points descendant
CREATE OR REPLACE FUNCTION
   getclassementgeneral()
RETURNS SETOF record AS $$
    SELECT 
		utilisateurs.id,
        utilisateurs.pseudo,
		SUM(niveaux.difficulte) 
	FROM ascensions, voies, niveaux, utilisateurs 
	WHERE 
		niveaux.id=voies.id_niveau 
		AND ascensions.id_voie=voies.id
		AND ascensions.id_utilisateur=utilisateurs.id
	GROUP BY utilisateurs.id 
	ORDER BY SUM(niveaux.difficulte) DESC;
    
$$ LANGUAGE SQL;


/*-----------------------------------------
                TRIGGERS
-----------------------------------------*/

DROP TRIGGER IF EXISTS supp_utilisateur ON utilisateurs;


-- Avant de supprimer un utilisateur, on supprime ses statistiques (ascencions et validationsChrono)

CREATE OR REPLACE FUNCTION supp_utilisateur()
    RETURNS TRIGGER AS
    $$
    BEGIN
        DELETE FROM ascensions WHERE ascensions.id_utilisateur = OLD.id;
        DELETE FROM chronos WHERE chronos.id_utilisateur =  OLD.id;
        RETURN OLD;
    END;
    $$
    LANGUAGE PLPGSQL;


CREATE TRIGGER supp_utilisateur
    BEFORE DELETE
    ON utilisateurs 
    FOR EACH ROW
EXECUTE PROCEDURE supp_utilisateur();


-- Quand le niveau d'une voie est changé, la couleur associée change.

DROP TRIGGER IF EXISTS changeCouleur ON voies;

CREATE OR REPLACE FUNCTION changeCouleur()
    RETURNS TRIGGER AS
    $$
	DECLARE couleurold VARCHAR(20);
	couleurnew VARCHAR(20);
    BEGIN
        IF(NEW.id = OLD.id) THEN
		SELECT couleur INTO couleurold FROM niveaux WHERE id = OLD.id_niveau;
		SELECT couleur INTO couleurnew FROM niveaux WHERE id = NEW.id_niveau;
		RAISE NOTICE 'ancienne couleur : % nouvelle couleur : %', couleurold, couleurnew;
		END IF;
		RETURN NEW;
    END;
    $$
    LANGUAGE PLPGSQL;


CREATE TRIGGER changeCouleur
    BEFORE UPDATE
    ON voies 
    FOR EACH ROW
EXECUTE PROCEDURE changeCouleur();

-- Vérifier que l’id des utilisateurs sont différents dans la table chronos sur une ligne à l’insertion.

DROP TRIGGER IF EXISTS compareid ON chronos;

CREATE OR REPLACE FUNCTION compareid()
    RETURNS TRIGGER AS
    $$
	DECLARE idmonteur INTEGER;
	idinsert INTEGER;
    BEGIN
	SELECT id_utilisateur INTO idmonteur FROM ascensions WHERE id = NEW.id_ascension;
	idinsert = NEW.id_ascension;
	RAISE NOTICE 'id selectionne: % id inséré : %', idmonteur, idinsert;
	IF(idmonteur = NEW.id_utilisateur) THEN
	RAISE EXCEPTION 'le grimpeur et le chronometreur doivent etre differents';
	END IF;
	RETURN NEW;
    END;
    $$
    LANGUAGE PLPGSQL;


CREATE TRIGGER compareid
    BEFORE INSERT
    ON chronos 
	FOR EACH ROW
EXECUTE PROCEDURE compareid();

-- Mettre à jour le meilleur grimpeur, le temps moyen des voies, 
-- et le niveau moyen d'un utilisateur à chaque insertion d'ascension.

DROP TRIGGER IF EXISTS miseajour ON ascensions;

CREATE OR REPLACE FUNCTION miseajour()
    RETURNS TRIGGER AS
    $$
	DECLARE newtemps TIME;
	newniveaux INTEGER;
	newidbest INTEGER;
	newpseudobest VARCHAR(20);
	BEGIN
	SELECT * INTO newtemps FROM gettempsmoyen(NEW.id_voie) AS (Record TIME);
	SELECT * INTO newniveaux FROM getniveaumoyen(NEW.id_utilisateur) AS (Moyenne Integer) ;
	SELECT * INTO newidbest, newpseudobest FROM getbestgrimp(NEW.id_voie) AS (id_u INTEGER, pseudo_u VARCHAR);
	RAISE NOTICE 'votre nouveau niveau est : % et le nouveau temps moyen voie : %', newniveaux , newtemps;
	RAISE NOTICE 'Le meilleur grimpeur de la voie est maintenant : % ', newpseudobest;
	RETURN NULL;
    END;
    $$
    LANGUAGE PLPGSQL;


CREATE TRIGGER miseajour
    AFTER INSERT
    ON ascensions
	FOR EACH ROW
EXECUTE PROCEDURE miseajour();


--TEST

--DELETE FROM utilisateurs WHERE id = 4 ;
--UPDATE voies SET id_niveau = 5 WHERE id=3;
--INSERT INTO chronos (id,id_ascension,id_utilisateur) VALUES(7,1,2);
--INSERT INTO ascensions (id,id_utilisateur,id_voie,temps) VALUES(8,7,2,'22:11.30');

