
DROP TABLE IF EXISTS ingresar;

CREATE TABLE ingresar (
  ID int NOT NULL AUTO_INCREMENT,
  username varchar(50) DEFAULT NULL,
  password varchar(45) NOT NULL,
  PRIMARY KEY (ID)
);

INSERT INTO ingresar VALUES (1,'root','1234');
