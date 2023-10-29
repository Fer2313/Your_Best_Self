CREATE DATABASE IF NOT EXISTS youbestself;
CREATE TABLE usuario (
  id_usuario INT AUTO_INCREMENT PRIMARY KEY,
  nombre VARCHAR(45),
  edad INT,
  peso INT,
  altura FLOAT,
  sexo VARCHAR(10)
);

CREATE TABLE ejercicio (
  Id_ejercicio INT AUTO_INCREMENT PRIMARY KEY,
  nombre_ejercicio VARCHAR(45),
  Descripcion varchar(500),
  musculo varchar(15),
  video varchar(45),
  imagen varchar(45)
);

CREATE TABLE entrenamiento (
  id_entrenamiento int AUTO_INCREMENT PRIMARY KEY,
  id_usuario int,
  nombre_entrenamiento varchar(20),
  dificultad int,
  descripcion varchar(500),
  fecha date,
  FOREIGN KEY (id_usuario) REFERENCES usuario(id_usuario) 
);

CREATE TABLE detalle_entrenamientos (
  id_detalle_entrenamiento int AUTO_INCREMENT PRIMARY KEY,
  id_usuario int,
  id_ejercicio int,
  id_entrenamiento int,
  series int,
  repeticiones int,
  tiempo timestamp,
 FOREIGN KEY (id_usuario) REFERENCES usuario(id_usuario),
 FOREIGN KEY (id_ejercicio) REFERENCES ejercicio(id_ejercicio),
 FOREIGN KEY (id_entrenamiento) REFERENCES entrenamiento(id_entrenamiento)
);

CREATE TABLE `Registro_entrenamiento` (
  registro_id int AUTO_INCREMENT PRIMARY KEY,
  id_usuario int,
  id_entrenamiento int,
  fecha date,
  kcal int,
  FOREIGN KEY (id_usuario) REFERENCES usuario(id_usuario),
  FOREIGN KEY (id_entrenamiento) REFERENCES entrenamiento(id_entrenamiento)
);






