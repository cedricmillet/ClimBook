--
-- DROP DES EVENTUELLES TABLES EXISTANTES
--
DROP TABLE IF EXISTS utilisateurs;
DROP TABLE IF EXISTS roles;

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
    CONSTRAINT cle_entrangere_role
        FOREIGN KEY(id_role) 
            REFERENCES roles(id)
            ON DELETE SET NULL
);

--
-- AJOUT DES ROLES
--
INSERT INTO roles (id, role) VALUES(1, 'admin');
INSERT INTO roles (id, role) VALUES(2, 'adherent');

--
-- AJOUT DES UTILISATEURS
--
INSERT INTO utilisateurs (id_role, pseudo, mdp, email) VALUES(1, 'admin', 'admin', 'admin@domain.com');
INSERT INTO utilisateurs (id_role, pseudo, mdp, email) VALUES(1, 'adherent', 'adherent', 'adherent@domain.com');

