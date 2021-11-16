
DROP DATABASE IF EXISTS USUARIOS;

CREATE DATABASE USUARIOS;

USE USUARIOS;

CREATE TABLE usuario (
  id int NOT NULL AUTO_INCREMENT,
  interseccion varchar(10) DEFAULT NULL,
  maximos varchar(10) DEFAULT NULL,
  inflexion varchar(10) DEFAULT NULL,
  creciente varchar(10) DEFAULT NULL,
  concava varchar(10) DEFAULT NULL,
  funcion varchar(45) DEFAULT NULL,
  PRIMARY KEY (id)
); 

INSERT INTO usuario VALUES 
(1, 'true','false','true','false','true','x,6,7x'),
(2, 'true','false','true','false','true','x~3,x~2,x,1,0');


