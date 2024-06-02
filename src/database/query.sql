CREATE DATABASE Lumiere;
USE Lumiere;

CREATE TABLE servicios(
    id_servicio INT AUTO_INCREMENT PRIMARY KEY,
    nombre_servicio VARCHAR(50) NOT NULL,
    descripcion_servicio VARCHAR (200) NOT NULL,
);

SELECT * FROM servicios;

CREATE USER 'lumiere'@'' IDENTIFIED BY 'lumiere'
GRANT ALL PRIVILEGES ON  lumiere .* TO 'lumiere'@'localhost';